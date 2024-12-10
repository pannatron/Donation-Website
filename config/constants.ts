export const DONATION_ADDRESS = 'S4DDsQjAwV2f9fGPNcbAQWPcQJP2GQT1VGrA5MK9Myq';
export const KT_TOKEN_ADDRESS = 'EStPXF2Mh3NVEezeysYfhrWXnuqwmbmjqLSP9vR5pump';

export const DONATION_GOAL = 25_000_000; // 100M KT tokens

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
    description: 'Donate to the voted zoo project in Thailand',
    icon: '🐾'
  },
  {
    amount: 25_000_000,
    description: 'Announce the Khaitun NFT operational plan and the next steps',
    icon: '📜'
  },
] as const;

if (!process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL) {
  throw new Error('NEXT_PUBLIC_ALCHEMY_RPC_URL environment variable is not set');
}

export const NETWORK_CONFIG = {
  mainnet: {
    name: 'mainnet-beta' as const,
    endpoint: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
  }
};

export const UI_CONFIG = {
  refreshInterval: 60000, // 10 seconds
  animationDuration: 1000, // 1 second
  maxDecimals: 1
};
