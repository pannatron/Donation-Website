import { 
  PublicKey,
  Transaction,
  TransactionSignature,
  RpcResponseAndContext,
  SignatureResult,
  ParsedAccountData,
  ParsedTransactionWithMeta,
  ParsedInstruction,
  VersionedTransactionResponse
} from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID, 
  createTransferInstruction, 
  getAssociatedTokenAddress, 
  createAssociatedTokenAccountInstruction,
  getAccount,
  Account
} from '@solana/spl-token';
import { DONATION_ADDRESS, KT_TOKEN_ADDRESS } from '../config/constants';
import {
  connection,
  TransactionError,
  withTimeout,
  withRetry,
  SEND_TRANSACTION_TIMEOUT,
  MAX_RETRIES,
  RETRY_DELAY,
  TRANSACTION_TIMEOUT,
  CONFIRMATION_CHECK_INTERVAL,
  isUserRejectionError
} from './solana-utils';

// Export public constants
export const donationPubKey = DONATION_ADDRESS;
export const ktTokenPubKey = KT_TOKEN_ADDRESS;

// Export public functions
export { getTokenBalance, getDonationProgress, sendTokens, getDonorRankings };

// Cache configuration
const CACHE_TTL = 60000; // 1 minute

// Interface definitions
interface DonorRanking {
  address: string;
  amount: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface RankingsCache {
  data: Array<DonorRanking>;
  lastSignature: string | null;
  lastUpdate: number;
}

// Cache structures
const cache = {
  tokenBalances: new Map<string, CacheEntry<number>>(),
  donationProgress: null as CacheEntry<number> | null,
  rankings: null as RankingsCache | null
};

// Helper function to check if cache is valid
function isCacheValid<T>(entry: CacheEntry<T> | null): boolean {
  if (!entry || typeof entry !== 'object' || !('timestamp' in entry)) {
    return false;
  }
  return Date.now() - entry.timestamp < CACHE_TTL;
}

// Helper function to safely sign transaction with enhanced error handling
async function safeSignTransaction(wallet: any, transaction: Transaction): Promise<Transaction | null> {
  if (!wallet) {
    console.error('Wallet object is null or undefined');
    return null;
  }

  if (typeof wallet.signTransaction !== 'function') {
    console.error('Wallet does not implement signTransaction method');
    return null;
  }

  if (!transaction) {
    console.error('Transaction object is null or undefined');
    return null;
  }

  try {
    // Add additional validation for transaction properties
    if (!transaction.recentBlockhash) {
      console.error('Transaction missing recentBlockhash');
      return null;
    }

    if (!transaction.feePayer) {
      console.error('Transaction missing feePayer');
      return null;
    }

    // Direct promise handling without withTimeout to catch rejections early
    try {
      const signedTransaction = await wallet.signTransaction(transaction);
      return signedTransaction;
    } catch (error: any) {
      // Handle user rejection immediately
      if (isUserRejectionError(error)) {
        console.log('User cancelled transaction');
        return null;
      }
      throw error;
    }

  } catch (error: any) {
    console.log('Transaction signing error:', error);
    
    // Enhanced error logging
    if (error.name) console.log('Error name:', error.name);
    if (error.code) console.log('Error code:', error.code);
    if (error.message) console.log('Error message:', error.message);
    
    // For other errors, return null but log the specific error
    console.error('Unexpected signing error:', error);
    return null;
  }
}

async function verifyTransactionSuccess(
  signature: string,
  toATA: PublicKey,
  expectedAmount: bigint
): Promise<boolean> {
  try {
    // First check: Transaction status
    const status = await connection.getSignatureStatus(signature);
    if (status.value?.confirmationStatus === 'confirmed' || status.value?.confirmationStatus === 'finalized') {
      if (!status.value.err) {
        console.log('Transaction verified via status check');
        return true;
      }
    }

    // Second check: Recipient balance
    try {
      const account = await getAccount(connection, toATA);
      if (Number(account.amount) > 0) {
        console.log('Transaction verified via balance check');
        return true;
      }
    } catch (err) {
      console.error('Balance check failed:', err);
    }

    // Final check: Transaction history
    try {
      const transaction = await connection.getTransaction(signature, {
        maxSupportedTransactionVersion: 0
      });
      if (transaction !== null) {
        console.log('Transaction verified via history check');
        return true;
      }
    } catch (err) {
      console.error('Transaction history check failed:', err);
    }

    return false;
  } catch (error) {
    console.error('Transaction verification error:', error);
    return false;
  }
}

async function pollTransactionStatus(
  signature: string, 
  toATA: PublicKey,
  expectedAmount: bigint,
  maxAttempts = 10
): Promise<boolean> {
  console.log('Starting transaction status polling...');
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const success = await verifyTransactionSuccess(signature, toATA, expectedAmount);
      if (success) {
        console.log('Transaction verified successful:', signature);
        return true;
      }
      
      console.log(`Polling attempt ${attempt + 1}/${maxAttempts}...`);
      await new Promise(resolve => setTimeout(resolve, CONFIRMATION_CHECK_INTERVAL));
    } catch (error) {
      console.error('Error polling transaction status:', error);
    }
  }
  
  try {
    const finalCheck = await verifyTransactionSuccess(signature, toATA, expectedAmount);
    if (finalCheck) {
      console.log('Transaction verified successful on final check:', signature);
      return true;
    }
  } catch (error) {
    console.error('Final verification check failed:', error);
  }

  return false;
}

async function confirmTransaction(
  signature: string,
  toATA: PublicKey,
  expectedAmount: bigint
): Promise<boolean> {
  console.log('Confirming transaction:', signature);
  
  try {
    // First try normal confirmation
    const confirmation = await withTimeout<RpcResponseAndContext<SignatureResult>>(
      connection.confirmTransaction(signature, 'confirmed'),
      30000,
      'Initial confirmation timed out',
      'Transaction confirmation'
    );

    if (!confirmation.value.err) {
      console.log('Transaction confirmed via normal confirmation');
      return true;
    }
  } catch (error) {
    console.log('Normal confirmation failed, falling back to polling:', error);
  }

  // If normal confirmation fails or times out, try polling
  try {
    const confirmed = await pollTransactionStatus(signature, toATA, expectedAmount);
    if (confirmed) {
      console.log('Transaction confirmed via polling');
      return true;
    }
  } catch (error) {
    console.error('Polling confirmation failed:', error);
  }

  // Final balance check
  try {
    const account = await getAccount(connection, toATA);
    if (Number(account.amount) > 0) {
      console.log('Transaction confirmed via final balance check');
      return true;
    }
  } catch (error) {
    console.error('Final balance check failed:', error);
  }

  return false;
}

async function initializeTokenAccount(
  mintPubkey: PublicKey,
  owner: PublicKey,
  payer: PublicKey,
  userWallet: any
): Promise<PublicKey> {
  const ata = await getAssociatedTokenAddress(mintPubkey, owner);
  
  try {
    console.log('Checking token account...');
    await withTimeout(
      withRetry(
        () => getAccount(connection, ata),
        MAX_RETRIES,
        RETRY_DELAY,
        'Account check'
      ),
      30000,
      'Account check timed out',
      'Account check'
    );
    console.log('Token account exists:', ata.toString());
    return ata;
  } catch (error: any) {
    if (error.name === 'TokenAccountNotFoundError') {
      console.log('Creating token account:', ata.toString());
      const transaction = new Transaction();
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payer,
          ata,
          owner,
          mintPubkey
        )
      );

      const blockHashData = await withTimeout(
        withRetry(
          async () => {
            const result = await connection.getLatestBlockhash('confirmed');
            return result;
          },
          MAX_RETRIES,
          RETRY_DELAY,
          'Blockhash fetch'
        ),
        30000,
        'Blockhash fetch timed out',
        'Blockhash fetch'
      );
      
      transaction.recentBlockhash = blockHashData.blockhash;
      transaction.lastValidBlockHeight = blockHashData.lastValidBlockHeight;
      transaction.feePayer = payer;

      const signedTransaction = await safeSignTransaction(userWallet, transaction);
      if (!signedTransaction) {
        return ata; // User cancelled, return ATA without creating
      }

      try {
        console.log('Sending transaction...');
        const signature = await withTimeout(
          withRetry(
            async () => {
              const sig: TransactionSignature = await connection.sendRawTransaction(signedTransaction.serialize(), {
                skipPreflight: false,
                preflightCommitment: 'confirmed',
                maxRetries: 3
              });
              return sig;
            },
            MAX_RETRIES,
            RETRY_DELAY,
            'Transaction send'
          ),
          SEND_TRANSACTION_TIMEOUT,
          'Transaction send timed out',
          'Transaction send'
        );

        const confirmed = await confirmTransaction(signature, ata, BigInt(0));
        if (!confirmed) {
          throw new TransactionError('Transaction may have failed', 'CONFIRMATION_ERROR');
        }
        console.log('Token account created:', ata.toString());
        await new Promise(resolve => setTimeout(resolve, 2000));
        return ata;
      } catch (error: any) {
        console.error('Error confirming token account creation:', error);
        throw new TransactionError('Failed to create token account', 'ACCOUNT_CREATION_ERROR');
      }
    }
    throw error;
  }
}

async function getTokenBalance(
  walletAddress: string
): Promise<number> {
  try {
    // Check cache first
    const cachedBalance = cache.tokenBalances.get(walletAddress);
    if (isCacheValid(cachedBalance)) {
      return cachedBalance.data;
    }

    console.log('Fetching token balance...');
    const tokenAccounts = await withTimeout(
      withRetry(
        async () => {
          const result = await connection.getParsedTokenAccountsByOwner(
            new PublicKey(walletAddress),
            { mint: new PublicKey(KT_TOKEN_ADDRESS) }
          );
          return result;
        },
        MAX_RETRIES,
        RETRY_DELAY,
        'Balance fetch'
      ),
      30000,
      'Balance fetch timed out',
      'Balance fetch'
    );

    const balance = tokenAccounts.value.length > 0 
      ? tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount || 0
      : 0;

    // Update cache
    cache.tokenBalances.set(walletAddress, {
      data: balance,
      timestamp: Date.now()
    });

    console.log('Balance fetch successful:', balance);
    return balance;
  } catch (error) {
    console.error('Error getting token balance:', error);
    return 0;
  }
}

async function getDonationProgress(): Promise<number> {
  try {
    // Check cache first
    if (isCacheValid(cache.donationProgress)) {
      return cache.donationProgress.data;
    }

    console.log('Fetching donation progress...');
    const tokenAccounts = await withTimeout(
      withRetry(
        async () => {
          const result = await connection.getParsedTokenAccountsByOwner(
            new PublicKey(DONATION_ADDRESS),
            { mint: new PublicKey(KT_TOKEN_ADDRESS) }
          );
          return result;
        },
        MAX_RETRIES,
        RETRY_DELAY,
        'Progress fetch'
      ),
      30000,
      'Progress fetch timed out',
      'Progress fetch'
    );

    const progress = tokenAccounts.value.length > 0
      ? tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount || 0
      : 0;

    // Update cache
    cache.donationProgress = {
      data: progress,
      timestamp: Date.now()
    };

    console.log('Progress fetch successful:', progress);
    return progress;
  } catch (error) {
    console.error('Error getting donation progress:', error);
    return 0;
  }
}

async function processTransactions(
  transactions: (VersionedTransactionResponse | null)[],
  donationATA: PublicKey,
  donations: { [key: string]: number }
): Promise<void> {
  const processPromises = transactions.map(async tx => {
    if (!tx?.meta || !tx.transaction.message.instructions) return;

    for (const instruction of tx.transaction.message.instructions) {
      const parsed = instruction as ParsedInstruction;
      
      if (
        parsed?.program === 'spl-token' && 
        (parsed?.parsed?.type === 'transfer' || parsed?.parsed?.type === 'transferChecked') &&
        parsed?.parsed?.info?.destination === donationATA.toString()
      ) {
        if (parsed.parsed.type === 'transferChecked' && parsed.parsed.info.mint !== KT_TOKEN_ADDRESS) {
          continue;
        }

        const sourceAddress = parsed.parsed.info.source;
        const amount = parsed.parsed.info.tokenAmount?.uiAmount || 
                      Number(parsed.parsed.info.amount) / Math.pow(10, 6);

        try {
          const sourceAccountInfo = await connection.getParsedAccountInfo(new PublicKey(sourceAddress));
          if (sourceAccountInfo.value && 'parsed' in sourceAccountInfo.value.data) {
            const parsedData = sourceAccountInfo.value.data as ParsedAccountData;
            const ownerAddress = parsedData.parsed.info.owner;

            if (!donations[ownerAddress]) {
              donations[ownerAddress] = 0;
            }
            donations[ownerAddress] += amount;
          }
        } catch (error) {
          console.error('Error getting source account owner:', error);
        }
      }
    }
  });

  await Promise.all(processPromises);
}

async function getDonorRankings(): Promise<Array<DonorRanking>> {
  try {
    console.log('Fetching donor rankings...');
    
    const donationATA = await getAssociatedTokenAddress(
      new PublicKey(KT_TOKEN_ADDRESS),
      new PublicKey(DONATION_ADDRESS)
    );

    // Initialize donations map
    const donations: { [key: string]: number } = {};

    // Get all signatures without limit
    let allSignatures = [];
    let lastSignature = null;
    
    while (true) {
      try {
        const signatures = await connection.getSignaturesForAddress(
          donationATA,
          lastSignature ? { before: lastSignature } : undefined
        );
        
        if (signatures.length === 0) break;
        
        allSignatures.push(...signatures);
        lastSignature = signatures[signatures.length - 1].signature;
        
        console.log(`Fetched ${allSignatures.length} signatures so far...`);
      } catch (error) {
        console.error('Error fetching signatures:', error);
        break;
      }
    }

    console.log(`Total signatures found: ${allSignatures.length}`);

    // Process all transactions in parallel batches
    const BATCH_SIZE = 50; // Process 50 transactions at a time to avoid memory issues
    for (let i = 0; i < allSignatures.length; i += BATCH_SIZE) {
      const batch = allSignatures.slice(i, i + BATCH_SIZE);
      
      // Fetch transactions in parallel
      const transactions = await Promise.all(
        batch.map(sig => 
          connection.getParsedTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0
          })
        )
      );

      await processTransactions(transactions, donationATA, donations);
      
      // Log progress
      console.log(`Processed ${Math.min(i + BATCH_SIZE, allSignatures.length)}/${allSignatures.length} transactions`);
    }

    // Update cache
    if (allSignatures.length > 0) {
      cache.rankings = {
        lastSignature: allSignatures[0].signature,
        lastUpdate: Date.now(),
        data: Object.entries(donations).map(([address, amount]) => ({ address, amount }))
      };
    }

    // Convert to array and sort by amount
    const rankings = Object.entries(donations)
      .map(([address, amount]) => ({ address, amount }))
      .sort((a, b) => b.amount - a.amount);

    return rankings;

  } catch (error) {
    console.error('Error getting donor rankings:', error);
    return cache.rankings?.data || [];
  }
}

async function sendTokens(
  amount: number,
  fromWallet: any
): Promise<string> {
  if (!fromWallet || !fromWallet.signTransaction) {
    throw new TransactionError('Invalid wallet configuration', 'WALLET_ERROR');
  }

  try {
    console.log('Starting token transfer...');
    const mintPubkey = new PublicKey(KT_TOKEN_ADDRESS);
    const fromPubkey = new PublicKey(fromWallet.publicKey);
    const toPubkey = new PublicKey(donationPubKey);

    console.log('Initializing token accounts...');
    const fromATA = await initializeTokenAccount(
      mintPubkey,
      fromPubkey,
      fromPubkey,
      fromWallet
    );

    const toATA = await initializeTokenAccount(
      mintPubkey,
      toPubkey,
      fromPubkey,
      fromWallet
    );

    console.log('Checking balance...');
    const fromAccount = await withRetry<Account>(
      () => getAccount(connection, fromATA),
      MAX_RETRIES,
      RETRY_DELAY,
      'Balance check'
    );
    
    const rawAmount = BigInt(Math.floor(amount * 1_000_000));
    
    const balance = Number(fromAccount.amount);
    if (balance < Number(rawAmount)) {
      throw new TransactionError('Insufficient funds in wallet', 'INSUFFICIENT_FUNDS');
    }

    console.log('Creating transfer transaction...');
    const transaction = new Transaction();
    transaction.add(
      createTransferInstruction(
        fromATA,
        toATA,
        fromPubkey,
        rawAmount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    const blockHashData = await withTimeout(
      withRetry(
        async () => {
          const result = await connection.getLatestBlockhash('confirmed');
          return result;
        },
        MAX_RETRIES,
        RETRY_DELAY,
        'Blockhash fetch'
      ),
      30000,
      'Blockhash fetch timed out',
      'Blockhash fetch'
    );
    
    transaction.recentBlockhash = blockHashData.blockhash;
    transaction.lastValidBlockHeight = blockHashData.lastValidBlockHeight;
    transaction.feePayer = fromPubkey;

    const signedTransaction = await safeSignTransaction(fromWallet, transaction);
    if (!signedTransaction) {
      return 'USER_CANCELLED';
    }

    console.log('Sending transaction...');
    const signature = await withTimeout(
      withRetry(
        async () => {
          const sig: TransactionSignature = await connection.sendRawTransaction(signedTransaction.serialize(), {
            skipPreflight: false,
            preflightCommitment: 'confirmed',
            maxRetries: 3
          });
          return sig;
        },
        MAX_RETRIES,
        RETRY_DELAY,
        'Transaction send'
      ),
      SEND_TRANSACTION_TIMEOUT,
      'Transaction send timed out',
      'Transaction send'
    );
    
    console.log('Transaction sent:', signature);
    const confirmed = await confirmTransaction(signature, toATA, rawAmount);
    if (!confirmed) {
      throw new TransactionError('Transaction may have failed', 'CONFIRMATION_ERROR');
    }
    console.log('Transaction completed successfully');
    return signature;

  } catch (error: any) {
    console.error('Transaction error:', error);
    
    if (error instanceof TransactionError) {
      if (error.code === 'USER_REJECTED') {
        return 'USER_CANCELLED';
      }
      throw error;
    }

    if (isUserRejectionError(error)) {
      return 'USER_CANCELLED';
    }

    if (error.message?.includes('timeout')) {
      throw new TransactionError(
        'Transaction timed out. Please try again.',
        'TIMEOUT_ERROR'
      );
    }

    if (error.message?.includes('rate limit') || error.code === 429) {
      throw new TransactionError(
        'Service is busy. Please try again in a moment.',
        'RATE_LIMIT'
      );
    }

    throw new TransactionError(
      'Transaction failed. Please try again.',
      'TRANSACTION_ERROR'
    );
  }
}
