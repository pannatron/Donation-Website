import { motion } from 'framer-motion';
import { PREDEFINED_AMOUNTS } from '../config/constants';

interface DonationButtonsProps {
  isLoading: boolean;
  userBalance: number;
  onDonate: (amount: number) => void;
}

export const DonationButtons = ({ isLoading, userBalance, onDonate }: DonationButtonsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
      {PREDEFINED_AMOUNTS.map((amount, index) => (
        <motion.button
          key={amount}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onDonate(amount)}
          disabled={isLoading || amount > userBalance}
          className={`donate-button ${
            isLoading || amount > userBalance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
          } bg-purple-600 rounded-lg py-3 px-4 transition-all relative overflow-hidden group`}
        >
          <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
            {amount.toLocaleString()} KT
          </span>
          {isLoading && (
            <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
};
