import { motion } from 'framer-motion';

interface CustomDonationProps {
  isLoading: boolean;
  customAmount: string;
  userBalance: number;
  onCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDonate: (amount: number) => void;
}

export const CustomDonation = ({ 
  isLoading, 
  customAmount, 
  userBalance,
  onCustomAmountChange, 
  onDonate 
}: CustomDonationProps) => {
  return (
    <motion.div 
      className="max-w-md mx-auto flex gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <input
        type="number"
        value={customAmount}
        onChange={onCustomAmountChange}
        placeholder="Enter custom amount"
        disabled={isLoading}
        min="0"
        step="1"
        className="flex-1 rounded-lg px-4 py-2 bg-gray-800 border border-purple-600 focus:outline-none focus:border-purple-400 disabled:opacity-50"
      />
      <button
        onClick={() => onDonate(Number(customAmount))}
        disabled={isLoading || !customAmount || Number(customAmount) <= 0 || Number(customAmount) > userBalance}
        className={`donate-button ${
          isLoading || !customAmount || Number(customAmount) <= 0 || Number(customAmount) > userBalance
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-purple-700'
        } bg-purple-600 rounded-lg px-6 py-2 transition-all relative overflow-hidden min-w-[120px]`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Donate'
        )}
      </button>
    </motion.div>
  );
};
