import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navigation } from '../components/Navigation';
import { SocialLinks } from '../components/SocialLinks';
import { DonationAddress } from '../components/DonationAddress';
import { ProgressBar } from '../components/ProgressBar';
import { WalletBalance } from '../components/WalletBalance';
import { DonationButtons } from '../components/DonationButtons';
import { CustomDonation } from '../components/CustomDonation';
import { Milestones } from '../components/Milestones';
import { DonationRanking } from '../components/DonationRanking';
import { SpecialRewards } from '../components/SpecialRewards';
import { EventWidget } from '../components/EventWidget';
import { useDonation } from '../hooks/useDonation';

export default function Home() {
  const {
    currentAmount,
    customAmount,
    isLoading,
    error,
    successMessage,
    userBalance,
    connected,
    handleDonate,
    handleCustomAmountChange,
  } = useDonation();

  const getErrorClassName = (type: 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'error':
        return 'text-red-400 bg-red-900/50 border-red-800';
      case 'warning':
        return 'text-yellow-400 bg-yellow-900/50 border-yellow-800';
      case 'info':
        return 'text-blue-400 bg-blue-900/50 border-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white relative">
      {/* Tiger Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="/tiger.jpg"
          alt="Tiger Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <SocialLinks />
      <Navigation />
      <DonationRanking />
      <div className="fixed top-[520px] left-25 z-50">
        <SpecialRewards />
      </div>
      <EventWidget />

      <main className="container mx-auto px-4 py-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #a78bfa 25%, #ffffff 50%, #818cf8 75%, #ffffff 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'shine 8s linear infinite',
              textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            Khaitun Ecosystem Donation
          </h1>
          <p className="text-xl text-gray-300 mb-8">Support the future of decentralized finance</p>

          <DonationAddress />

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 ${getErrorClassName(error.type)} p-3 rounded-lg mx-auto max-w-md border`}
            >
              {error.message}
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-green-400 bg-green-900/50 border border-green-800 p-3 rounded-lg mx-auto max-w-md"
            >
              {successMessage}
            </motion.div>
          )}
        </motion.div>

        <ProgressBar currentAmount={currentAmount} />
        <WalletBalance connected={connected} userBalance={userBalance} />

        {connected && (
          <>
            <DonationButtons
              isLoading={isLoading}
              userBalance={userBalance}
              onDonate={handleDonate}
            />
            <CustomDonation
              isLoading={isLoading}
              customAmount={customAmount}
              userBalance={userBalance}
              onCustomAmountChange={handleCustomAmountChange}
              onDonate={handleDonate}
            />
          </>
        )}

        <Milestones currentAmount={currentAmount} />
      </main>
    </div>
  );
}
