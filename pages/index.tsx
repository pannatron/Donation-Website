import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { getDonationProgress, sendTokens, donationPubKey, ktTokenPubKey, TransactionError, getTokenBalance } from '../utils/solana';
import { 
  DONATION_GOAL, 
  PREDEFINED_AMOUNTS, 
  MILESTONES,
  UI_CONFIG 
} from '../config/constants';
import Image from 'next/image';
import Link from 'next/link';

interface ErrorMessage {
  message: string;
  type: 'error' | 'warning' | 'info';
}

export default function Home() {
  const { connection } = useConnection();
  const { connected, publicKey, signTransaction } = useWallet();
  const [currentAmount, setCurrentAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [showCopied, setShowCopied] = useState(false);
  
  const progress = Math.min((currentAmount / DONATION_GOAL) * 100, 100);
  const donationAddress = "S4DDsQjAwV2f9fGPNcbAQWPcQJP2GQT1VGrA5MK9Myq";

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(donationAddress);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, [connected]);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (connected && publicKey) {
        try {
          const balance = await getTokenBalance(publicKey.toString());
          setUserBalance(balance);
        } catch (err) {
          console.error('Error fetching user balance:', err);
        }
      } else {
        setUserBalance(0);
      }
    };

    fetchUserBalance();
    const interval = setInterval(fetchUserBalance, UI_CONFIG.refreshInterval);
    return () => clearInterval(interval);
  }, [connected, publicKey]);

  const fetchDonationProgress = useCallback(async () => {
    try {
      const amount = await getDonationProgress();
      setCurrentAmount(amount);
    } catch (err) {
      console.error('Error fetching donation progress:', err);
    }
  }, []);

  useEffect(() => {
    fetchDonationProgress();
    const interval = setInterval(fetchDonationProgress, UI_CONFIG.refreshInterval);
    return () => clearInterval(interval);
  }, [fetchDonationProgress]);

  const showError = (message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    setError({ message, type });
    if (type !== 'error') {
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleDonate = async (amount: number) => {
    if (!connected || !publicKey) {
      showError('Please connect your wallet first', 'warning');
      return;
    }

    if (amount <= 0) {
      showError('Please enter a valid amount', 'warning');
      return;
    }

    if (amount > userBalance) {
      showError('Insufficient balance in your wallet', 'warning');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await sendTokens(
        amount,
        { publicKey, signTransaction }
      );

      // Handle user cancellation
      if (result === 'USER_CANCELLED') {
        showError('Transaction cancelled', 'info');
        return;
      }

      await Promise.all([
        fetchDonationProgress(),
        getTokenBalance(publicKey.toString()).then(setUserBalance)
      ]);
      
      setCustomAmount('');
      setSuccessMessage(`Successfully donated ${amount.toLocaleString()} KT!`);
      setTimeout(() => setSuccessMessage(null), 5000);

    } catch (err: any) {
      console.error('Donation error:', err);
      
      if (err instanceof TransactionError) {
        switch (err.code) {
          case 'INSUFFICIENT_FUNDS':
            showError('Insufficient funds in your wallet', 'error');
            break;
          case 'WALLET_ERROR':
            showError('Please reconnect your wallet and try again', 'error');
            break;
          case 'BLOCKHASH_ERROR':
          case 'NETWORK_ERROR':
            showError('Network error. Please try again', 'warning');
            break;
          case 'SIGNING_ERROR':
            showError('Failed to sign transaction. Please try again', 'error');
            break;
          case 'SEND_ERROR':
            showError('Failed to send transaction. Please try again', 'error');
            break;
          case 'CONFIRMATION_ERROR':
            showError('Transaction failed to confirm. Please check your wallet', 'warning');
            break;
          case 'TRANSACTION_ERROR':
            showError('Transaction failed. Please try again', 'error');
            break;
          default:
            showError(err.message || 'An unexpected error occurred', 'error');
        }
      } else {
        showError('Failed to process donation. Please try again', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || Number(value) >= 0) {
      setCustomAmount(value);
      setError(null);
    }
  };

  const getErrorClassName = (type: 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'error':
        return 'text-red-400 bg-red-900/50 border-red-800';
      case 'warning':
        return 'text-yellow-400 bg-yellow-900/50 border-yellow-800';
      case 'info':
        return 'text-blue-400 bg-blue-900/50 border-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white relative">
      {/* Tiger Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="/tiger.jpg"
          alt="Tiger Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Social Links */}
      <div className="fixed top-4 left-4 z-30 flex flex-col gap-3">
        <a 
          href="https://x.com/khaituntiger" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200 group"
          title="Twitter/X"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        
        <a 
          href="https://khaitun.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          title="Website"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
          </svg>
        </a>

        <a 
          href="https://t.me/KhaitunTiger" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          title="Telegram"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
          </svg>
        </a>

        <a 
          href="https://dexscreener.com/solana/ahzduwyvqhpq7swgqbvjauxnzi8dg3qy73pywghp21hv" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          title="DexScreener"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
          </svg>
        </a>
      </div>

      {/* Top Navigation */}
      <nav className="container mx-auto px-4 py-4 relative z-20">
        <div className="flex justify-between items-center">
          {/* Navigation Links */}
          <div className="flex-1 flex justify-center gap-8">
            <Link 
              href="/distribution"
              className="text-white/90 hover:text-white text-sm transition-colors"
            >
              Token Distribution
            </Link>
            <Link 
              href="/revenue"
              className="text-white/90 hover:text-white text-sm transition-colors"
            >
              Revenue Model
            </Link>
            <Link 
              href="/nft"
              className="text-white/90 hover:text-white text-sm transition-colors"
            >
              Khaitun NFT
            </Link>
          </div>
          {/* Wallet Button */}
          <div className="absolute right-4">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6 animate-float">Khaitun Ecosystem Donation</h1>
          <p className="text-xl text-gray-300 mb-8">Support the future of decentralized finance</p>

          {/* Donation Address */}
          <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg">
            <p className="text-gray-300 mb-3">Donation Address:</p>
            <div className="flex items-center justify-center gap-3">
              <code className="bg-black/30 px-4 py-2.5 rounded-lg text-sm font-mono">{donationAddress}</code>
              <button
                onClick={copyAddress}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-colors text-sm relative"
              >
                {showCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-4 ${getErrorClassName(error.type)} p-3 rounded-lg mx-auto max-w-md border`}
              >
                {error.message}
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-green-400 bg-green-900/50 border border-green-800 p-3 rounded-lg mx-auto max-w-md"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar with Icon */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="progress-bar-container h-8">
            <motion.div
              className="progress-bar-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: UI_CONFIG.animationDuration / 1000 }}
            />
            <motion.div
              className="progress-tiger"
              initial={{ left: 0 }}
              animate={{ left: `${progress}%` }}
              transition={{ duration: UI_CONFIG.animationDuration / 1000 }}
            >
              <Image
                src="/icon.png"
                alt="Progress Icon"
                width={32}
                height={32}
                className="animate-bounce-slow"
              />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>{currentAmount.toLocaleString()} KT</span>
            <span>{DONATION_GOAL.toLocaleString()} KT</span>
          </div>
        </div>

        {/* Wallet Balance */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {connected && (
            <motion.div 
              className="mt-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-gray-300">Your Balance: </span>
              <span className="font-bold text-purple-400">{userBalance.toLocaleString()} KT</span>
            </motion.div>
          )}
        </motion.div>

        {connected && (
          <>
            {/* Quick Donate Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {PREDEFINED_AMOUNTS.map((amount, index) => (
                <motion.button
                  key={amount}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleDonate(amount)}
                  disabled={isLoading || amount > userBalance}
                  className={`donate-button ${
                    isLoading || amount > userBalance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                  } bg-purple-600 rounded-lg py-3 px-4 transition-all relative overflow-hidden group`}
                >
                  <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                    {amount.toLocaleString()} KT
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Custom Amount */}
            <motion.div 
              className="max-w-md mx-auto flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter custom amount"
                disabled={isLoading}
                min="0"
                step="1"
                className="flex-1 rounded-lg px-4 py-2 bg-gray-800 border border-purple-600 focus:outline-none focus:border-purple-400 disabled:opacity-50"
              />
              <button
                onClick={() => handleDonate(Number(customAmount))}
                disabled={isLoading || !customAmount || Number(customAmount) <= 0 || Number(customAmount) > userBalance}
                className={`donate-button ${
                  isLoading || !customAmount || Number(customAmount) <= 0 || Number(customAmount) > userBalance
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-purple-700'
                } bg-purple-600 rounded-lg px-6 py-2 transition-all relative overflow-hidden min-w-[120px]`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Donate'
                )}
              </button>
            </motion.div>
          </>
        )}

        {/* Milestones */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Milestones</h2>
          <div className="space-y-4">
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`milestone-card p-4 rounded-lg border ${
                  currentAmount >= milestone.amount
                    ? 'bg-purple-900/50 border-purple-500'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold">
                    {milestone.icon} {milestone.amount.toLocaleString()} KT
                  </span>
                  <span>{currentAmount >= milestone.amount ? '✅ Completed' : '🔒 Locked'}</span>
                </div>
                <p className="text-gray-300">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
