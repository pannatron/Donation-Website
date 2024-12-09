import { motion } from 'framer-motion';
import { MILESTONES } from '../config/constants';

interface MilestonesProps {
  currentAmount: number;
}

export const Milestones = ({ currentAmount }: MilestonesProps) => {
  return (
    <div className="max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6">Milestones</h2>
      <div className="space-y-4">
        {MILESTONES.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`milestone-card p-4 rounded-lg border ${
              currentAmount >= milestone.amount
                ? 'bg-purple-900/50 border-purple-500'
                : 'bg-gray-800/50 border-gray-700'
            }`}
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold">
                {milestone.icon} {milestone.amount.toLocaleString()} KT
              </span>
              <span>{currentAmount >= milestone.amount ? '✅ Completed' : '🔒 Locked'}</span>
            </div>
            <p className="text-gray-300">{milestone.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
