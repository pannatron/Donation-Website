import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TierBenefit {
  locked: string[];
  unlocked: string[];
}

interface Tier {
  name: string;
  range: string;
  image: string;
  glowColor: string;
  benefits: TierBenefit;
  apy: {
    locked: string;
    unlocked: string;
  };
}

const tiers: Tier[] = [
  {
    name: 'Bronze',
    range: '1 - 999,999',
    image: '/bronze.webp',
    glowColor: 'rgba(205, 127, 50, 0.8)',
    benefits: {
      locked: [
        '3% APY staking rewards',
        'Access to basic community updates and newsletters',
        'Small discounts on platform services (3%)'
      ],
      unlocked: [
        'Access to community updates only',
        'No staking rewards',
        'Minimal discounts (1%)'
      ]
    },
    apy: {
      locked: '3%',
      unlocked: '0%'
    }
  },
  {
    name: 'Silver',
    range: '1,000,000 - 4,999,999',
    image: '/silver.webp',
    glowColor: 'rgba(192, 192, 192, 0.8)',
    benefits: {
      locked: [
        '5% APY staking rewards',
        'Early access to new features and product launches',
        'Moderate discounts on platform services (7%)',
        'Eligible for lotteries and giveaways'
      ],
      unlocked: [
        'Access to early updates',
        'Smaller discounts (3%)',
        'Limited eligibility for giveaways'
      ]
    },
    apy: {
      locked: '5%',
      unlocked: '0%'
    }
  },
  {
    name: 'Gold',
    range: '5,000,000 - 9,999,999',
    image: '/gold.webp',
    glowColor: 'rgba(255, 215, 0, 0.8)',
    benefits: {
      locked: [
        '8% APY staking rewards',
        'Priority access to premium features and events',
        'Higher discounts (12%) on platform services',
        'Full governance voting rights'
      ],
      unlocked: [
        'Reduced staking rewards (5%)',
        'Standard discounts (6%)',
        'Basic governance rights'
      ]
    },
    apy: {
      locked: '8%',
      unlocked: '5%'
    }
  },
  {
    name: 'Platinum',
    range: '10,000,000+',
    image: '/platinum.webp',
    glowColor: 'linear-gradient(135deg, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.8))',
    benefits: {
      locked: [
        '12-15% APY staking rewards',
        'Exclusive VIP perks and NFT drops',
        'Highest discounts (15-20%) on services',
        'Weighted governance votes (1 token = 2 votes)'
      ],
      unlocked: [
        'Reduced staking rewards (8%)',
        'Standard discounts (10%)',
        'Limited access to VIP perks'
      ]
    },
    apy: {
      locked: '12-15%',
      unlocked: '8%'
    }
  }
];

const Distribution = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [showLocked, setShowLocked] = useState<{ [key: number]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePosition({
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      });
    };

    window.addEventListener('mousemove', handleMouseMove as any);
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, []);

  const toggleLockStatus = (index: number) => {
    setShowLocked(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white relative" ref={containerRef}>
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

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-indigo-900/50 to-black/80 animate-gradient-fade-in" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3),transparent_50%)] animate-gradient-pulse" />
        <div className="absolute w-[500px] h-[500px] -left-48 top-0 bg-purple-500/30 rounded-full filter blur-[120px] animate-glow-pulse" />
        <div className="absolute w-[500px] h-[500px] -right-48 bottom-0 bg-indigo-500/30 rounded-full filter blur-[120px] animate-glow-pulse-delayed" />
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <Link 
            href="/"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl text-sm relative overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/50 hover:border-purple-400"
          >
            ← Back to Donation
          </Link>
        </div>

        <div className="max-w-7xl mx-auto space-y-16 animate-fade-in">
          {/* Total Supply Section */}
          <section className="text-center max-w-4xl mx-auto">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #a78bfa 25%, #ffffff 50%, #818cf8 75%, #ffffff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'shine  linear infinite',
                textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
              }}
            >
              Token Distribution
            </h1>
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-8 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transform transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200">
                Total Supply: 1,000,000,000 tokens
              </h2>
              <div className="space-y-4">
                <p className="text-gray-200">
                  All tokens were initially distributed through PumpFund with no pre-allocations to the team, developers, or any stakeholders.
                </p>
              </div>
            </div>
          </section>

          {/* Tier Benefits */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              Tier Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tiers.map((tier: Tier, index: number) => (
                <div
                  key={tier.name}
                  className={`relative group cursor-pointer animate-slide-up ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={() => setHoveredTier(index)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  {/* Card Container */}
                  <div 
                    className={`relative transform transition-all duration-500 ${
                      hoveredTier === index ? 'scale-[1.02]' : ''
                    } ${index === 0 ? 'animate-shimmer-bronze' : index === 1 ? 'animate-shimmer-silver' : index === 2 ? 'animate-shimmer-gold' : 'animate-shimmer-platinum'}`}
                    style={{
                      transform: hoveredTier === index 
                        ? `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
                        : 'none',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Emblem Container */}
                    <div className="relative w-full aspect-square mb-6 rounded-full overflow-hidden">
                      {/* Glow Effect */}
                      <div 
                        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
                          showLocked[index] ? 'scale-110 animate-pulse-glow' : ''
                        } ${index === 3 && showLocked[index] ? 'platinum-glow' : ''}`}
                        style={{ 
                          background: tier.glowColor,
                          opacity: showLocked[index] ? 0.8 : 0.4
                        }}
                      />
                      
                      {/* Emblem Image */}
                      <div 
                        className={`relative w-full h-full transform transition-all duration-500 ${
                          showLocked[index] ? 'scale-110 animate-float' : 'group-hover:scale-110'
                        }`}
                      >
                        <div className={`absolute inset-0 emblem-shadow transition-all duration-500 ${
                          showLocked[index] ? `shadow-intense ${index === 3 ? 'shadow-platinum' : ''}` : ''
                        }`} />
                        <Image
                          src={tier.image}
                          alt={`${tier.name} Tier`}
                          layout="fill"
                          objectFit="contain"
                          className={`transition-all duration-500 ${
                            showLocked[index] ? `brightness-125 ${index === 3 ? 'animate-pulse-bright-platinum' : 'animate-pulse-bright'}` : 'group-hover:rotate-[5deg]'
                          }`}
                        />
                        {/* Enhanced Shine Effect */}
                        <div 
                          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                            showLocked[index] ? 'opacity-100 animate-shine-intense' : 'opacity-0 group-hover:opacity-100 animate-shine'
                          } ${index === 3 && showLocked[index] ? 'platinum-shine' : ''}`}
                          style={{
                            background: showLocked[index] 
                              ? index === 3
                                ? 'linear-gradient(105deg, transparent 35%, rgba(147, 197, 253, 0.4) 40%, rgba(59, 130, 246, 0.5) 42%, rgba(147, 197, 253, 0.4) 44%, transparent 49%)'
                                : 'linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.4) 42%, rgba(255, 255, 255, 0.3) 44%, transparent 49%)'
                              : 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.3) 47%, rgba(255, 255, 255, 0.2) 49%, transparent 54%)',
                          }}
                        />
                      </div>

                      {/* Lock Status Glow Ring */}
                      <div 
                        className={`absolute inset-0 rounded-full transition-all duration-500 ${
                          showLocked[index] ? 'opacity-100 animate-ring-rotate' : 'opacity-0'
                        } ${index === 3 ? 'platinum-ring' : ''}`}
                        style={{
                          background: index === 3
                            ? 'conic-gradient(from 0deg, transparent, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.8), transparent)'
                            : `conic-gradient(from 0deg, transparent, ${tier.glowColor}, transparent)`,
                        }}
                      />
                    </div>

                    {/* Content Card */}
                    <div className="relative bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 hover:border-purple-400/50 transform transition-all duration-500">
                      {/* Tier Info */}
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                        <p className="text-sm text-gray-300">{tier.range} tokens</p>
                      </div>

                      {/* APY Display */}
                      <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-4 text-center mb-4 border border-purple-500/20">
                        <span className="text-sm block mb-1">APY Rewards</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200">
                          {showLocked[index] ? tier.apy.locked : tier.apy.unlocked}
                        </span>
                      </div>

                      {/* Benefits List */}
                      <div className="space-y-2 min-h-[180px] mb-4">
                        {(showLocked[index] ? tier.benefits.locked : tier.benefits.unlocked).map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-2 animate-fade-in bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg p-2 transform transition-all duration-300 hover:scale-[1.02] border border-purple-500/20"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <span className="text-sm text-purple-300">✦</span>
                            <span className="text-sm text-gray-200">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Lock/Unlock Toggle */}
                      <button
                        onClick={() => toggleLockStatus(index)}
                        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                          showLocked[index]
                            ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 hover:from-green-500/40 hover:to-emerald-500/40 border border-green-400/30 hover:border-green-400/50'
                            : 'bg-gradient-to-r from-red-500/30 to-pink-500/30 hover:from-red-500/40 hover:to-pink-500/40 border border-red-400/30 hover:border-red-400/50'
                        }`}
                      >
                        {showLocked[index] ? 'View Unlocked' : 'View Locked'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Coming Soon Section */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-8 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 text-center transform transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                Coming Soon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transform transition-all duration-300 hover:scale-[1.05]">
                  <div className="text-2xl mb-4">🌟</div>
                  <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200">Enhanced Rewards</h3>
                  <p className="text-gray-300">Boosted staking rewards and exclusive partnership benefits</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transform transition-all duration-300 hover:scale-[1.05]">
                  <div className="text-2xl mb-4">⚡</div>
                  <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200">Advanced Features</h3>
                  <p className="text-gray-300">Governance upgrades and cross-chain integration</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style jsx global>{`
        .emblem-shadow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: 
            inset 0 0 30px rgba(0,0,0,0.5),
            0 0 30px rgba(0,0,0,0.5);
          transition: all 0.5s ease;
        }

        .shadow-intense {
          box-shadow: 
            inset 0 0 50px rgba(255,255,255,0.2),
            0 0 50px rgba(255,255,255,0.2);
        }

        .shadow-platinum {
          box-shadow: 
            inset 0 0 50px rgba(147, 197, 253, 0.3),
            0 0 50px rgba(59, 130, 246, 0.3);
        }

        .platinum-glow {
          background: linear-gradient(135deg, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.8)) !important;
        }

        .platinum-shine {
          background: linear-gradient(105deg, 
            transparent 35%,
            rgba(147, 197, 253, 0.4) 40%,
            rgba(59, 130, 246, 0.5) 42%,
            rgba(147, 197, 253, 0.4) 44%,
            transparent 49%
          ) !important;
        }

        .platinum-ring {
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(147, 197, 253, 0.8),
            rgba(59, 130, 246, 0.8),
            transparent
          ) !important;
        }

        @keyframes pulse-bright {
          0%, 100% { filter: brightness(125%); }
          50% { filter: brightness(150%); }
        }

        @keyframes pulse-bright-platinum {
          0%, 100% { 
            filter: brightness(125%) drop-shadow(0 0 10px rgba(147, 197, 253, 0.5));
          }
          50% { 
            filter: brightness(150%) drop-shadow(0 0 20px rgba(59, 130, 246, 0.7));
          }
        }

        @keyframes pulse-glow {
          0%, 100% { transform: scale(1.1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1.1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }

        @keyframes ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shine-intense {
          0% { transform: translateX(-200%) rotate(-45deg); }
          100% { transform: translateX(200%) rotate(-45deg); }
        }

        @keyframes gradient-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes gradient-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }

        @keyframes slide-up {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes shimmer-bronze {
          0%, 100% { box-shadow: 0 0 20px rgba(180, 83, 9, 0.4); }
          50% { box-shadow: 0 0 35px rgba(180, 83, 9, 0.6); }
        }

        @keyframes shimmer-silver {
          0%, 100% { box-shadow: 0 0 20px rgba(148, 163, 184, 0.4); }
          50% { box-shadow: 0 0 35px rgba(148, 163, 184, 0.6); }
        }

        @keyframes shimmer-gold {
          0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.4); }
          50% { box-shadow: 0 0 35px rgba(234, 179, 8, 0.6); }
        }

        @keyframes shimmer-platinum {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(147, 197, 253, 0.4);
          }
          50% { 
            box-shadow: 0 0 35px rgba(59, 130, 246, 0.6);
          }
        }

        .animate-pulse-bright {
          animation: pulse-bright 2s ease-in-out infinite;
        }

        .animate-pulse-bright-platinum {
          animation: pulse-bright-platinum 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-ring-rotate {
          animation: ring-rotate 8s linear infinite;
        }

        .animate-shine-intense {
          animation: shine-intense 1.5s linear infinite;
        }

        .animate-gradient-fade-in {
          animation: gradient-fade-in 1s ease-out forwards;
        }

        .animate-gradient-pulse {
          animation: gradient-pulse 4s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }

        .animate-glow-pulse-delayed {
          animation: glow-pulse 4s ease-in-out infinite 2s;
        }

        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-shine {
          animation: shine 2s linear infinite;
        }

        .animate-shimmer-bronze {
          animation: shimmer-bronze 2s ease-in-out infinite;
        }

        .animate-shimmer-silver {
          animation: shimmer-silver 2s ease-in-out infinite;
        }

        .animate-shimmer-gold {
          animation: shimmer-gold 2s ease-in-out infinite;
        }

        .animate-shimmer-platinum {
          animation: shimmer-platinum 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Distribution;
