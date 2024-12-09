export const DONATION_ADDRESS = 'S4DDsQjAwV2f9fGPNcbAQWPcQJP2GQT1VGrA5MK9Myq';
export const KT_TOKEN_ADDRESS = 'EStPXF2Mh3NVEezeysYfhrWXnuqwmbmjqLSP9vR5pump';

export const DONATION_GOAL = 100_000_000; // 100M KT tokens

export const PREDEFINED_AMOUNTS = [
  10_000,      // 10K KT
  100_000,     // 100K KT
  1_000_000,   // 1M KT
  10_000_000,  // 10M KT
] as const;

export const MILESTONES = [
  {
    amount: 5_000_000,
    description: 'Launch the full ecosystem website',
    icon: '🚀'
  },
  {
    amount: 20_000_000,
    description: 'Begin core team funding',
    icon: '💰'
  },
  {
    amount: 100_000_000,
    description: 'NFT rewards distribution',
    icon: '🎁'
  },
] as const;

export const NETWORK_CONFIG = {
  mainnet: {
    name: 'mainnet-beta' as const,
    // Using Alchemy RPC endpoint
    endpoint: 'https://solana-rpc.publicnode.com'
  }
};

export const UI_CONFIG = {
  refreshInterval: 10000, // 10 seconds
  animationDuration: 1000, // 1 second
  maxDecimals: 1
};
