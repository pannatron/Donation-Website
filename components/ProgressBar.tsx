import { motion } from 'framer-motion';
import Image from 'next/image';
import { UI_CONFIG, DONATION_GOAL } from '../config/constants';

interface ProgressBarProps {
  currentAmount: number;
}

export const ProgressBar = ({ currentAmount }: ProgressBarProps) => {
  const progress = Math.min((currentAmount / DONATION_GOAL) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="progress-bar-container h-8">
        <motion.div
          className="progress-bar-fill h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: UI_CONFIG.animationDuration / 1000 }}
        />
        <motion.div
          className="progress-tiger"
          initial={{ left: 0 }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: UI_CONFIG.animationDuration / 1000 }}
        >
          <Image
            src="/icon.png"
            alt="Progress Icon"
            width={32}
            height={32}
            className="animate-bounce-slow"
          />
        </motion.div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span>{currentAmount.toLocaleString()} KT</span>
        <span>{DONATION_GOAL.toLocaleString()} KT</span>
      </div>
    </div>
  );
};
