import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection } from '@solana/web3.js';
import { NETWORK_CONFIG } from '../config/constants';

require('@solana/wallet-adapter-react-ui/styles.css');

export default function WalletConnectionProvider({ children }: { children: React.ReactNode }) {
  // Set network to mainnet
  const network = WalletAdapterNetwork.Mainnet;
  
  // Use our configured RPC endpoint
  const endpoint = NETWORK_CONFIG.mainnet.endpoint;

  // Configure connection
  const connection = useMemo(
    () => new Connection(endpoint, { commitment: 'confirmed' }),
    [endpoint]
  );

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({ network }),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment: 'confirmed' }}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect
        onError={(error: Error) => {
          // Suppress wallet errors from showing as unhandled
          console.log('Wallet error:', error.message);
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
