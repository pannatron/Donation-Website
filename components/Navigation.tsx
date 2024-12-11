import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto px-4 py-4 relative z-20">
      <div className="flex flex-wrap justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white hover:text-purple-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`
          w-full lg:w-auto lg:flex-1 lg:flex lg:justify-center lg:gap-8
          ${isMenuOpen ? 'block' : 'hidden'}
          mt-4 lg:mt-0
        `}>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
            <Link 
              href="/distribution"
              className="text-white/90 hover:text-white text-sm transition-colors w-full lg:w-auto text-center py-2 lg:py-0"
            >
              Token Distribution
            </Link>
            <Link 
              href="/revenue"
              className="text-white/90 hover:text-white text-sm transition-colors w-full lg:w-auto text-center py-2 lg:py-0"
            >
              Revenue Model
            </Link>
            <Link 
              href="/nft"
              className="text-white/90 hover:text-white text-sm transition-colors w-full lg:w-auto text-center py-2 lg:py-0"
            >
              Khaitun NFT
            </Link>
          </div>
        </div>

        {/* Wallet Button - Adjusted for mobile */}
        <div className="lg:fixed lg:right-8 lg:top-4 absolute right-4 top-4">
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !text-sm !px-4 !py-2" />
        </div>
      </div>
    </nav>
  );
};
