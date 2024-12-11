import React, { useState, useEffect, MouseEvent, useRef } from 'react';
import Image from 'next/image';

interface NFTSlide {
  nft: string;
  real: string;
  title: string;
  description: string;
  supply: string;
}

const slides: NFTSlide[] = [
  {
    nft: '/NFT1.jpg',
    real: '/real1.jpg',
    title: 'Khaitun Genesis',
    description: 'The first edition of the Khaitun NFT collection, featuring unique digital artistry.',
    supply: '100'
  },
  {
    nft: '/NFT2.jpg',
    real: '/real2_1.jpg',
    title: 'Khaitun Exclusive',
    description: 'Limited edition NFT with premium benefits and exclusive access rights.',
    supply: '50'
  },
  {
    nft: '/NFT3.jpg',
    real: '/real3_1.jpg',
    title: 'Khaitun Elite',
    description: 'Elite tier NFT offering maximum benefits and governance rights.',
    supply: '25'
  },
  {
    nft: '/NFT4.jpg',
    real: '/real4_1.jpg',
    title: 'Khaitun Premium',
    description: 'Premium tier NFT offering adv benefits and governance rights.',
    supply: '100'
  }
];

const NFTGallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showRealImages, setShowRealImages] = useState<{ [key: number]: boolean }>({});
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(rotation);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    const animate = () => {
      if (autoRotate) {
        setRotation(prev => (prev + 0.2) % 360);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  const toggleRealImage = (index: number, e: MouseEvent) => {
    e.stopPropagation();
    setShowRealImages(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-[450px] relative" ref={containerRef}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/80 to-indigo-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute w-[500px] h-[500px] -left-48 top-0 bg-purple-500/20 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] -right-48 bottom-0 bg-indigo-500/20 rounded-full filter blur-[120px] animate-pulse delay-1000" />
      </div>

      <div 
        className="absolute inset-0 flex items-center justify-center"
        onMouseEnter={() => setAutoRotate(false)}
        onMouseLeave={() => setAutoRotate(true)}
        style={{
          perspective: '2500px',
          transformStyle: 'preserve-3d'
        }}
      >
        {slides.map((slide, index) => {
          const angle = (360 / slides.length) * index + rotationRef.current;
          const radian = (angle * Math.PI) / 180;
          const radius = 300;
          
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius * 0.2;
          const z = Math.sin(radian) * radius;

          const scale = (z + radius) / (radius * 2);
          const zIndex = Math.round(scale * 1000);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="absolute transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${0.5 + scale * 0.5})`,
                zIndex,
              }}
            >
              <div
                className={`relative w-[400px] h-[500px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-500 group ${
                  isHovered ? 'brightness-110' : 'brightness-50'
                } ${index === 0 ? 'animate-shimmer-gold' : index === 1 ? 'animate-shimmer-silver' : 'animate-shimmer-bronze'}`}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setAutoRotate(false);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setAutoRotate(true);
                }}
                style={{
                  transform: isHovered 
                    ? `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
                    : 'none',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Enhanced Glow Effect */}
                <div 
                  className={`absolute inset-0 rounded-2xl blur-2xl transition-all duration-500 ${
                    isHovered ? 'opacity-80 scale-105 animate-pulse-glow' : 'opacity-0'
                  }`}
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.4), rgba(59, 130, 246, 0.4))'
                  }}
                />

                {/* Enhanced Shine Effect */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                    isHovered ? 'opacity-100 animate-shine-intense' : 'opacity-0 group-hover:opacity-100 animate-shine'
                  }`}
                  style={{
                    background: isHovered
                      ? 'linear-gradient(105deg, transparent 35%, rgba(147, 197, 253, 0.4) 40%, rgba(59, 130, 246, 0.5) 42%, rgba(147, 197, 253, 0.4) 44%, transparent 49%)'
                      : 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.2) 47%, rgba(255, 255, 255, 0.1) 49%, transparent 54%)',
                  }}
                />

                <div className="absolute inset-0 transition-transform duration-500 will-change-transform">
                  <Image
                    src={showRealImages[index] ? slide.real : slide.nft}
                    alt={slide.title}
                    fill
                    sizes="400px"
                    quality={90}
                    priority
                    className={`object-cover transition-all duration-300 group-hover:scale-105 will-change-transform ${
                      isHovered ? 'brightness-125 animate-pulse-bright' : ''
                    }`}
                    loading="eager"
                  />
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/80 to-transparent transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="absolute inset-x-0 bottom-0 p-6 pt-52">
                    <div className="mb-4 space-x-3">
                      <span className="inline-block bg-gradient-to-r from-purple-500/40 to-indigo-500/40 backdrop-blur-sm px-4 py-2 rounded-xl text-sm text-white border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                        Supply: {slide.supply}
                      </span>
                      <span className="inline-block bg-gradient-to-r from-indigo-500/40 to-purple-500/40 backdrop-blur-sm px-4 py-2 rounded-xl text-sm text-white font-semibold border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                        Mint Soon
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200">
                      {slide.title}
                    </h3>
                    <p className="text-sm text-slate-200 mb-4">
                      {slide.description}
                    </p>
                    
                    <button 
                      className="bg-gradient-to-r from-purple-500/80 to-indigo-600/80 hover:from-purple-500 hover:to-indigo-600 text-white px-6 py-2 rounded-xl text-sm relative overflow-hidden group/btn w-fit transition-transform duration-300 hover:scale-105 active:scale-95 border border-purple-500/30"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => toggleRealImage(index, e)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                      {showRealImages[index] ? 'View NFT' : 'View Real Drop'}
                    </button>
                  </div>
                </div>

                <div
                  className={`absolute top-4 right-4 bg-gradient-to-r from-purple-500/80 to-indigo-600/80 backdrop-blur-sm px-3 py-1 rounded-xl text-xs text-white font-medium transition-all duration-300 border border-purple-500/30 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                >
                  {showRealImages[index] ? 'Real Drop' : 'Digital NFT'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes shimmer-gold {
          0%, 100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.3); }
          50% { box-shadow: 0 0 25px rgba(234, 179, 8, 0.5); }
        }

        @keyframes shimmer-silver {
          0%, 100% { box-shadow: 0 0 15px rgba(148, 163, 184, 0.3); }
          50% { box-shadow: 0 0 25px rgba(148, 163, 184, 0.5); }
        }

        @keyframes shimmer-bronze {
          0%, 100% { box-shadow: 0 0 15px rgba(180, 83, 9, 0.3); }
          50% { box-shadow: 0 0 25px rgba(180, 83, 9, 0.5); }
        }


        @keyframes shine-intense {
          0% { transform: translateX(-200%) rotate(-45deg); }
          100% { transform: translateX(200%) rotate(-45deg); }
        }

        @keyframes pulse-bright {
          0%, 100% { filter: brightness(125%); }
          50% { filter: brightness(150%); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
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

        .animate-shine {
          animation: shine 2s linear infinite;
        }

        .animate-shine-intense {
          animation: shine-intense 1.5s linear infinite;
        }

        .animate-pulse-bright {
          animation: pulse-bright 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NFTGallery;
