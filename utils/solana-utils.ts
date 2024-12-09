import { Connection, Commitment } from '@solana/web3.js';
import { NETWORK_CONFIG } from '../config/constants';
import { toast } from 'react-hot-toast';

// Timeout and retry constants
export const RETRY_DELAY = 500; // 0.5 second initial delay
export const MAX_RETRIES = 5; // Reduced retries
export const CONFIRMATION_TIMEOUT = 60000; // 1 minute max wait
export const RATE_LIMIT_DELAY = 1000; // 1 second initial rate limit delay
export const MAX_RATE_LIMIT_DELAY = 30000; // 30 seconds max delay
export const TRANSACTION_TIMEOUT = 120000; // 2 minutes total transaction timeout
export const SEND_TRANSACTION_TIMEOUT = 30000; // 30 seconds for sending transaction
export const CONFIRMATION_CHECK_INTERVAL = 2000; // Check every 2 seconds

// Initialize connection with optimized timeout settings
export const connection = new Connection(NETWORK_CONFIG.mainnet.endpoint, {
  commitment: 'confirmed' as Commitment,
  confirmTransactionInitialTimeout: 60000, // 1 minute initial timeout
  disableRetryOnRateLimit: false
});

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Enhanced helper function to check if an error is a user rejection
export function isUserRejectionError(error: any): boolean {
  if (!error) return false;
  
  // Common rejection patterns across different wallets
  const rejectionPatterns = [
    'user rejected',
    'rejected the request',
    'user denied',
    'user cancelled',
    'transaction was not confirmed',
    'failed to sign transaction',
    'user reject',
    'rejected by user',
    'user declined',
    'wallet adapter error',
    'signature request denied',
    'transaction rejected',
    'wallet disconnected'
  ];

  // Check various conditions that indicate user rejection
  return (
    error.code === 4001 || // Standard wallet rejection code
    error.code === -32603 || // Phantom wallet internal error code
    error.code === 'USER_REJECTED' ||
    error.name === 'WalletSignTransactionError' ||
    error.name === 'WalletConnectionError' ||
    rejectionPatterns.some(pattern => 
      error.message?.toLowerCase().includes(pattern)
    )
  );
}

export class TransactionError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'TransactionError';
    
    // Only show toast for actual errors, not user actions or warnings
    if (!['USER_REJECTED', 'USER_CANCELLED'].includes(code || '') && 
        !isUserRejectionError({ message, code })) {
      toast.error(message);
    }
  }
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string,
  operationName = 'Operation'
): Promise<T | null> {
  let timeoutId: NodeJS.Timeout | undefined;

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  // Immediately wrap the input promise to catch rejections
  const wrappedPromise = promise.catch(error => {
    if (isUserRejectionError(error)) {
      console.log(`${operationName}: User rejected the transaction`);
      return null;
    }
    throw error;
  });

  // Create a promise that rejects on timeout
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error(`${errorMessage} (${timeoutMs}ms)`));
    }, timeoutMs);
  });

  try {
    // Race between the wrapped promise and timeout
    const result = await Promise.race([wrappedPromise, timeoutPromise]);
    cleanup();
    
    if (result === null) {
      console.log(`${operationName}: Operation returned null`);
      return null;
    }
    
    return result;
  } catch (error: any) {
    cleanup();
    
    if (error.message?.includes('timed out')) {
      console.log(`${operationName}: Operation timed out`);
      return null;
    }

    if (isUserRejectionError(error)) {
      console.log(`${operationName}: User rejected the transaction`);
      return null;
    }

    console.error(`${operationName} error:`, {
      name: error.name,
      message: error.message,
      code: error.code
    });

    throw new TransactionError(
      error.message || 'Operation failed',
      error.code || 'OPERATION_FAILED'
    );
  }
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  baseDelay = RETRY_DELAY,
  operationName = 'Operation'
): Promise<T | null> {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`${operationName}: Attempt ${i + 1}/${retries}`);
      const result = await operation();
      
      // Handle null result explicitly
      if (result === null) {
        console.log(`${operationName}: Operation returned null (likely user rejection)`);
        return null;
      }
      
      console.log(`${operationName}: Success`);
      return result;
    } catch (error: any) {
      lastError = error;
      console.error(`${operationName}: Error:`, error);
      
      // Check for user rejection - immediately return null
      if (isUserRejectionError(error)) {
        console.log(`${operationName}: User rejected`);
        return null;
      }
      
      // Handle rate limits
      if (error.message?.includes('rate limit') || error.code === 429) {
        const delay = Math.min(RATE_LIMIT_DELAY * Math.pow(1.5, i), MAX_RATE_LIMIT_DELAY);
        console.log(`${operationName}: Rate limited, waiting ${delay}ms`);
        await sleep(delay);
        continue;
      }

      // Handle expired blockhash
      if (error.message?.includes('blockhash not found') || error.code === 404) {
        console.log(`${operationName}: Blockhash expired, retrying immediately`);
        continue;
      }

      // Final attempt failed
      if (i === retries - 1) {
        console.log(`${operationName}: All attempts failed`);
        throw new TransactionError(
          `Operation failed: ${error.message}`,
          error.code || 'OPERATION_FAILED'
        );
      }

      // Calculate backoff delay
      const delay = Math.min(baseDelay * Math.pow(1.5, i), MAX_RATE_LIMIT_DELAY);
      console.log(`${operationName}: Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }
  
  throw lastError;
}
