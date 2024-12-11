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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      {/* Tiger Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <Image
          src="/tiger.jpg"
          alt="Tiger Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <Navigation />
      <SocialLinks />
      
      {/* Main Layout Container */}
      <div className="pt-20 pb-12">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_300px] gap-8">
            {/* Left Sidebar */}
            <div className="order-2 xl:order-1">
              <div className="flex flex-col">
                {/* Top Donors Container */}
                <div className="-mt-6">
                  <div className="scale-[1] origin-top">
                    <DonationRanking />
                  </div>
                </div>
                {/* Special Rewards */}
                <div className="mt-[380px] -ml-10 scale-[1] origin-top">
                  <SpecialRewards />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="order-1 xl:order-2 min-w-0">
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
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
                <p className="text-lg sm:text-xl text-gray-300 mb-8">
                  Support the future of decentralized finance
                </p>

                <div className="max-w-2xl mx-auto">
                  <DonationAddress />

                  {error && (
                    <div className={`mt-4 ${getErrorClassName(error.type)} p-3 rounded-lg border`}>
                      {error.message}
                    </div>
                  )}
                  {successMessage && (
                    <div className="mt-4 text-green-400 bg-green-900/50 border border-green-800 p-3 rounded-lg">
                      {successMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* Donation Section */}
              <div className="max-w-2xl mx-auto space-y-8">
                <ProgressBar currentAmount={currentAmount} />
                <WalletBalance connected={connected} userBalance={userBalance} />

                {connected && (
                  <div className="space-y-6">
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
                  </div>
                )}

                <Milestones currentAmount={currentAmount} />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="order-3">
              <div className="sticky top-24">
                <EventWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
