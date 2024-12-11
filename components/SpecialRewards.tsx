import React from 'react';

export const SpecialRewards = React.memo(() => {
  return (
    <div className="w-[280px] -mt-24 bg-gradient-to-br from-purple-900/40 via-black/40 to-purple-900/40 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 animate-float scale-[0.85] sm:scale-100 origin-top-left">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-gradient"></div>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>

      <h2 className="relative text-xs sm:text-sm font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse flex items-center justify-center gap-2">
        <span className="text-base sm:text-lg">✨</span> SPECIAL REWARDS <span className="text-base sm:text-lg">✨</span>
      </h2>
      
      <div className="relative text-[11px] sm:text-xs text-center text-purple-200 mb-1.5 font-medium">
        Guaranteed rewards await you! 🎁
      </div>

      <div className="text-[10px] sm:text-[11px] text-center text-purple-300/90 mb-2">
        NFT claim available later for all tiers 🎮
      </div>
      
      <div className="relative space-y-2">
      <div className="relative space-y-2">

  {/* 4,000,000 KT+ */}
  <div className="p-2.5 bg-gradient-to-r from-purple-800/40 to-pink-800/40 rounded-lg hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 border border-purple-500 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-md">
    <h3 className="text-xs sm:text-sm font-bold text-purple-200 flex items-center justify-between mb-1.5">
      <span className="text-base sm:text-lg mr-2">👑</span>
      <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent flex-1">
        4,000,000 KT+ (Premium)
      </span>
    </h3>
    <ul className="text-[11px] sm:text-xs text-purple-300 list-disc list-inside space-y-0.5">
      <li className="hover:text-purple-200 transition-colors font-medium">
        All 4 designs of 3D Printed Khaitun (3-4 colors)
      </li>
      <li className="hover:text-purple-200 transition-colors font-medium">
        Picture frame with wallet address
      </li>
      <li className="hover:text-purple-200 transition-colors font-medium">
        Exclusive Drop Design
      </li>
    </ul>
  </div>

  {/* 1,000,000 KT+ */}
  <div className="p-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg hover:from-purple-800/40 hover:to-pink-800/40 transition-all duration-300 border border-purple-500/10 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg">
    <h3 className="text-xs sm:text-sm font-bold text-purple-200 flex items-center justify-between mb-1.5">
      <span className="text-base sm:text-lg mr-2">💎</span>
      <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent flex-1">
        1,000,000 KT+
      </span>
    </h3>
    <ul className="text-[11px] sm:text-xs text-purple-300 list-disc list-inside space-y-0.5">
      <li className="hover:text-purple-200 transition-colors font-medium">
        3D Printed Khaitun (Random 1 from 4, 3-4 colors)
      </li>
      <li className="hover:text-purple-200 transition-colors font-medium">
        Picture frame with wallet address
      </li>
    </ul>
  </div>

  {/* 500,000 KT+ */}
  <div className="p-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg hover:from-purple-800/40 hover:to-pink-800/40 transition-all duration-300 border border-purple-500/10 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg">
    <h3 className="text-xs sm:text-sm font-bold text-purple-200 flex items-center justify-between mb-1.5">
      <span className="text-base sm:text-lg mr-2">💫</span>
      <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent flex-1">
        500,000 KT+
      </span>
    </h3>
    <ul className="text-[11px] sm:text-xs text-purple-300 list-disc list-inside space-y-0.5">
      <li className="hover:text-purple-200 transition-colors font-medium">
        3D Printed Khaitun (Random 1 from 4, 2 colors)
      </li>
    </ul>
  </div>
</div>

        <div className="p-1.5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg text-[11px] sm:text-xs text-blue-300 border border-blue-500/10 hover:from-blue-800/40 hover:to-purple-800/40 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-center justify-center font-medium">
            <span className="text-sm sm:text-base mr-1.5">📅</span>
            <span>Snapshot every 2 weeks</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(0.85);
          }
          50% {
            transform: translateY(-10px) scale(0.85);
          }
        }

        @media (min-width: 640px) {
          @keyframes float {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1);
            }
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

        .shimmer-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 0.75rem;
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
      `}</style>
    </div>
  );
});

SpecialRewards.displayName = 'SpecialRewards';
