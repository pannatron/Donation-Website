import { motion } from 'framer-motion';

interface WalletBalanceProps {
  connected: boolean;
  userBalance: number;
}

export const WalletBalance = ({ connected, userBalance }: WalletBalanceProps) => {
  if (!connected) return null;

  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div 
        className="mt-4 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-gray-300">Your Balance: </span>
        <span className="font-bold text-purple-400">{userBalance.toLocaleString()} KT</span>
      </motion.div>
    </motion.div>
  );
};
