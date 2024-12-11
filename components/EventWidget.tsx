import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const EventWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWalletActive, setIsWalletActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2025-04-01T00:00:00');
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleWalletClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const walletButton = target.closest('.wallet-adapter-button');
      const walletDropdown = target.closest('.wallet-adapter-dropdown');
      const walletList = target.closest('.wallet-adapter-dropdown-list');
      
      if (walletButton || walletDropdown) {
        setIsWalletActive(true);
      } 
      else if (!walletList) {
        setIsWalletActive(false);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsWalletActive(false);
      }
    };

    document.addEventListener('click', handleWalletClick);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleWalletClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const baseClasses = `
    w-full xl:w-80 xl:fixed xl:right-8 xl:top-25
    rounded-2xl bg-gradient-to-br from-purple-900/40 via-black/40 to-purple-900/40 
    backdrop-blur-md border border-purple-500/30 
    shadow-[0_0_15px_rgba(168,85,247,0.15)] 
    transform hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] 
    animate-float hover:border-purple-400/50
    transition-all duration-300 ease-in-out
    ${isExpanded ? 'xl:h-[85vh]' : 'h-auto'}
    ${isWalletActive ? 'xl:top-40 pointer-events-none' : 'z-20'}
  `;

  return (
    <div className={baseClasses}>
      <div className={`relative p-4 rounded-2xl h-full ${isWalletActive ? 'pointer-events-auto' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-colors duration-300">
              Khaitun Event
            </h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-400 hover:text-purple-300 transition-all duration-300 p-1.5 hover:bg-purple-500/20 rounded-lg transform hover:scale-110"
            >
              {isExpanded ? '▼' : '▲'}
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-2 group hover:from-purple-900/50 hover:to-pink-900/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <span className="text-xl font-mono text-purple-200 group-hover:text-purple-100">{String(value).padStart(2, '0')}</span>
                </div>
                <div className="text-xs text-purple-300 mt-1 capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
              style={{ width: '60%' }}
            />
          </div>

          {/* Top 3 Rewards */}
          <div className="space-y-2 mb-6">
            <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-700/30 p-2.5 rounded-xl animate-shimmer-gold relative overflow-hidden hover:from-yellow-900/40 hover:to-yellow-700/40 transition-colors duration-300">
              <div className="text-yellow-400 font-bold flex items-center justify-between">
                <span>1. 👑 1st Place</span>
                <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full">MAX</span>
              </div>
              <div className="text-sm text-purple-200">12-Color 3D Print + NFT + 10% Share</div>
            </div>
            <div className="bg-gradient-to-r from-slate-700/30 to-slate-600/30 p-2.5 rounded-xl animate-shimmer-silver relative overflow-hidden hover:from-slate-700/40 hover:to-slate-600/40 transition-colors duration-300">
              <div className="text-slate-300 font-bold flex items-center justify-between">
                <span>2. 🥈 2nd Place</span>
                <span className="text-xs bg-slate-400/20 text-slate-300 px-2 py-0.5 rounded-full">MAX</span>
              </div>
              <div className="text-sm text-purple-200">12-Color 3D Print + NFT + 5% Share</div>
            </div>
            <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 p-2.5 rounded-xl animate-shimmer-bronze relative overflow-hidden hover:from-amber-900/40 hover:to-amber-800/40 transition-colors duration-300">
              <div className="text-amber-600 font-bold flex items-center justify-between">
                <span>3. 🥉 3rd Place</span>
                <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full">MAX</span>
              </div>
              <div className="text-sm text-purple-200">12-Color 3D Print + NFT + 3% Share</div>
            </div>
          </div>

          {/* Expanded Content */}
          <div className={`overflow-y-auto custom-scrollbar transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[calc(100%-440px)]' : 'max-h-0'}`}>
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-pink-800/30 to-purple-800/30 p-2.5 rounded-xl animate-shimmer-special relative overflow-hidden hover:from-pink-800/40 hover:to-purple-800/40 transition-colors duration-300">
                <div className="text-pink-300 font-medium">
                  🏆 Top 50 donors will receive a special edition 3D Printed Khaitun
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 mt-2">
                <div className="bg-gradient-to-r from-purple-800/30 to-fuchsia-800/30 p-1.5 rounded-lg animate-shimmer-purple relative overflow-hidden hover:from-purple-800/40 hover:to-fuchsia-800/40 transition-colors duration-300">
                  <div className="text-fuchsia-300 text-[11px] font-medium mb-0.5">4. 7th - 10th</div>
                  <div className="text-[10px] text-fuchsia-300/90 bg-fuchsia-400/10 px-1.5 py-0.5 rounded-full inline-block mb-0.5">ADV</div>
                  <div className="text-[10px] leading-tight text-purple-200/90">8-Color Print<br/>NFT + 1% Share</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-700/30 to-fuchsia-700/30 p-1.5 rounded-lg animate-shimmer-purple-mid relative overflow-hidden hover:from-purple-700/40 hover:to-fuchsia-700/40 transition-colors duration-300">
                  <div className="text-fuchsia-300 text-[11px] font-medium mb-0.5">5. 11th - 20th</div>
                  <div className="text-[10px] text-fuchsia-300/90 bg-fuchsia-400/10 px-1.5 py-0.5 rounded-full inline-block mb-0.5">MID</div>
                  <div className="text-[10px] leading-tight text-purple-200/90">4-Color Print<br/>NFT + 0.5% Share</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 p-1.5 rounded-lg animate-shimmer-purple-light relative overflow-hidden hover:from-purple-600/40 hover:to-fuchsia-600/40 transition-colors duration-300">
                  <div className="text-fuchsia-300 text-[11px] font-medium mb-0.5">6. 21st - 50th</div>
                  <div className="text-[10px] text-fuchsia-300/90 bg-fuchsia-400/10 px-1.5 py-0.5 rounded-full inline-block mb-0.5">GEN</div>
                  <div className="text-[10px] leading-tight text-purple-200/90">4-Color Print<br/>NFT + 0.1% Share</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-800/30 to-violet-800/30 p-2.5 rounded-xl animate-shimmer-random relative overflow-hidden mt-2 hover:from-indigo-800/40 hover:to-violet-800/40 transition-colors duration-300">
                <div className="text-indigo-300 font-medium">
                  🎲 Ranks 51-500 will have a chance to win 30 special rewards
                </div>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-auto space-y-2">
            <div className="text-sm text-center font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rewards will be distributed at a later stage.
              <br />
              This is not the final milestone
               additional milestones will follow.
            </div>
            <div className="text-xs text-center text-purple-300/80">
              Discover exclusive NFT benefits and ecosystem rewards
            </div>
          </div>

          {/* Learn More Button */}
          <Link
            href="/nft"
            className="pointer-events-auto block w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 py-2 px-3 rounded-xl hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] text-sm font-medium text-center group cursor-pointer hover:text-purple-200 mt-2"
          >
            <span className="group-hover:animate-pulse">Learn more about rewards & NFT</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer-gold {
          0%, 100% {
            box-shadow: 0 0 15px rgba(234, 179, 8, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(234, 179, 8, 0.5);
          }
        }

        @keyframes shimmer-silver {
          0%, 100% {
            box-shadow: 0 0 15px rgba(148, 163, 184, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(148, 163, 184, 0.5);
          }
        }

        @keyframes shimmer-bronze {
          0%, 100% {
            box-shadow: 0 0 15px rgba(180, 83, 9, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(180, 83, 9, 0.5);
          }
        }

        @keyframes shimmer-special {
          0%, 100% {
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(236, 72, 153, 0.5);
          }
        }

        @keyframes shimmer-random {
          0%, 100% {
            box-shadow: 0 0 15px rgba(129, 140, 248, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(129, 140, 248, 0.5);
          }
        }

        @keyframes shimmer-purple {
          0%, 100% {
            box-shadow: 0 0 15px rgba(192, 132, 252, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(192, 132, 252, 0.5);
          }
        }

        @keyframes shimmer-purple-mid {
          0%, 100% {
            box-shadow: 0 0 12px rgba(192, 132, 252, 0.25);
          }
          50% {
            box-shadow: 0 0 20px rgba(192, 132, 252, 0.4);
          }
        }

        @keyframes shimmer-purple-light {
          0%, 100% {
            box-shadow: 0 0 10px rgba(192, 132, 252, 0.2);
          }
          50% {
            box-shadow: 0 0 15px rgba(192, 132, 252, 0.3);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-shimmer-gold {
          animation: shimmer-gold 2s ease-in-out infinite;
        }

        .animate-shimmer-silver {
          animation: shimmer-silver 2s ease-in-out infinite;
        }

        .animate-shimmer-bronze {
          animation: shimmer-bronze 2s ease-in-out infinite;
        }

        .animate-shimmer-special {
          animation: shimmer-special 2s ease-in-out infinite;
        }

        .animate-shimmer-random {
          animation: shimmer-random 2s ease-in-out infinite;
        }

        .animate-shimmer-purple {
          animation: shimmer-purple 2s ease-in-out infinite;
        }

        .animate-shimmer-purple-mid {
          animation: shimmer-purple-mid 2s ease-in-out infinite;
        }

        .animate-shimmer-purple-light {
          animation: shimmer-purple-light 2s ease-in-out infinite;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(168, 85, 247, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(168, 85, 247, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </div>
  );
};
