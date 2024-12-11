import React, { useState } from 'react';
import { useDonationRanking } from '../hooks/useDonationRanking';
import { useWallet } from '@solana/wallet-adapter-react';

export const DonationRanking = React.memo(() => {
  const { rankings, isLoading, error, refresh } = useDonationRanking();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { publicKey } = useWallet();

  // Updated base classes for better mobile responsiveness
  const baseClasses = "xl:fixed xl:-top-15 xl:-left-10 relative mx-4 xl:mx-0 z-20 w-auto xl:w-80 bg-gradient-to-br from-purple-900/40 via-black/40 to-purple-900/40 backdrop-blur-md rounded-2xl p-4 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-500 ease-out transform animate-float";

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Find user's rank and gap
  const userRankInfo = React.useMemo(() => {
    if (!publicKey || !rankings.length) return null;

    const userRankIndex = rankings.findIndex(donor => 
      donor.address.toLowerCase() === publicKey.toString().toLowerCase()
    );

    if (userRankIndex === -1) return null;

    const userRank = userRankIndex + 1;
    const userAmount = rankings[userRankIndex].amount;
    const nextRankAmount = userRankIndex > 0 ? rankings[userRankIndex - 1].amount : null;
    const gapToNextRank = nextRankAmount ? nextRankAmount - userAmount : null;

    return {
      rank: userRank,
      amount: userAmount,
      gapToNextRank,
      nextRankAmount
    };
  }, [publicKey, rankings]);

  if (isLoading) {
    return (
      <div className={`${baseClasses} animate-pulse`}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-gradient"></div>
        <div className="shimmer-wrapper">
          <div className="shimmer"></div>
        </div>
        <h2 className="text-sm font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Top Donors
        </h2>
        <div className="space-y-2">
          <div className="h-12 bg-purple-900/30 rounded-xl animate-pulse"></div>
          <div className="h-12 bg-purple-900/30 rounded-xl animate-pulse delay-75"></div>
          <div className="h-12 bg-purple-900/30 rounded-xl animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={baseClasses}>
        <h2 className="text-sm font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Top Donors
        </h2>
        <div className="text-red-400 text-sm">{error}</div>
      </div>
    );
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0:
        return '👑';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return null;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-300 to-amber-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)] animate-glow';
      case 1:
        return 'bg-gradient-to-r from-slate-300 to-slate-400 text-black shadow-[0_0_12px_rgba(148,163,184,0.4)]';
      case 2:
        return 'bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-[0_0_10px_rgba(180,83,9,0.4)]';
      default:
        return 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white';
    }
  };

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  // Show only top 3
  const topRankings = rankings.slice(0, 3);

  return (
    <div className={`${baseClasses} hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-gradient"></div>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
      
      {/* Header with Refresh Button */}
      <div className="relative flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          Top Donors
        </h2>
        <button
          onClick={handleRefresh}
          className={`p-1.5 rounded-lg text-purple-400 hover:text-purple-300 transition-all duration-300 hover:bg-purple-500/20 transform hover:scale-110 ${isRefreshing ? 'animate-spin' : ''}`}
          disabled={isRefreshing}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* User's Current Rank Info */}
      {publicKey && userRankInfo && (
        <div className="relative mb-4 p-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl text-xs">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-blue-300">Your Rank:</span>
              <span className="font-bold text-blue-200">#{userRankInfo.rank}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-300">Your Amount:</span>
              <span className="font-bold text-blue-200">{formatAmount(userRankInfo.amount)} KT</span>
            </div>
            {userRankInfo.gapToNextRank && (
              <div className="flex items-center justify-between">
                <span className="text-blue-300">Gap to Next Rank:</span>
                <span className="font-bold text-blue-200">{formatAmount(userRankInfo.gapToNextRank)} KT</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Top 3 Rankings */}
      <div className="relative space-y-2.5">
        {topRankings.map((donor, index) => (
          <div
            key={donor.address}
            style={{ 
              animationDelay: `${index * 150}ms`,
              opacity: 0,
              animation: 'fadeIn 0.5s ease-out forwards'
            }}
            className={`flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl hover:from-purple-900/40 hover:to-pink-900/40 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg ${index === 0 ? 'animate-spotlight' : ''} ${publicKey && donor.address.toLowerCase() === publicKey.toString().toLowerCase() ? 'border-2 border-purple-500' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <span className={`w-7 h-7 flex items-center justify-center ${getRankColor(index)} rounded-lg text-xs font-bold group-hover:scale-110 transition-transform duration-300`}>
                {getMedalEmoji(index) || (index + 1)}
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-purple-200 group-hover:text-purple-100 transition-colors">
                  {formatAddress(donor.address)}
                </span>
                <button
                  onClick={() => handleCopyAddress(donor.address)}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-all duration-300 p-1.5 hover:bg-purple-500/20 rounded-lg transform hover:scale-110 hover:rotate-3"
                  title="Copy address"
                >
                  {copiedAddress === donor.address ? (
                    <span className="text-green-400 animate-bounce">✓</span>
                  ) : (
                    <span>📋</span>
                  )}
                </button>
              </div>
            </div>
            <span className="text-xs font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              {formatAmount(donor.amount)} KT
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        @keyframes glow {
          0%, 100% {
            filter: brightness(100%) drop-shadow(0 0 15px rgba(251,191,36,0.4));
          }
          50% {
            filter: brightness(120%) drop-shadow(0 0 20px rgba(251,191,36,0.6));
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .shimmer-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 1rem;
        }

        .shimmer {
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.1),
            transparent
          );
          position: absolute;
          top: 0;
          left: 0;
          animation: shimmer 3s infinite;
          transform: skewX(-20deg);
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          50% {
            transform: translateX(200%) skewX(-20deg);
          }
          100% {
            transform: translateX(200%) skewX(-20deg);
          }
        }

        @keyframes spotlight {
          0%, 100% {
            box-shadow: 0 0 15px rgba(168,85,247,0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(168,85,247,0.5);
          }
        }

        .animate-spotlight {
          animation: spotlight 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

DonationRanking.displayName = 'DonationRanking';