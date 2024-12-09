import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Navigation = () => {
  return (
    <nav className="container mx-auto px-4 py-4 relative z-20">
      <div className="flex justify-between items-center">
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
        <div className="absolute right-4">
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
        </div>
      </div>
    </nav>
  );
};
