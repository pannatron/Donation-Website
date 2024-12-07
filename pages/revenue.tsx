import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Revenue = () => {
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

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
          >
            ← Back to Donation
          </Link>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12">Revenue Model</h1>
          
          {/* Revenue Streams */}
          <div className="grid gap-8">
            {/* Trading Fees */}
            <div className="bg-white/5 rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Trading Fees</h3>
                  <p className="text-gray-300">Commission from trading activities on the platform, including spot and futures trading.</p>
                </div>
              </div>
            </div>

            {/* Listing Fees */}
            <div className="bg-white/5 rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Token Listing Fees</h3>
                  <p className="text-gray-300">Revenue from new token listings and partnerships with promising blockchain projects.</p>
                </div>
              </div>
            </div>

            {/* Staking Rewards */}
            <div className="bg-white/5 rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Staking & Yield Farming</h3>
                  <p className="text-gray-300">Returns generated from staking pools and yield farming opportunities provided to users.</p>
                </div>
              </div>
            </div>

            {/* NFT Marketplace */}
            <div className="bg-white/5 rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-rose-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">NFT Marketplace Fees</h3>
                  <p className="text-gray-300">Commission from NFT trades and special collection launches on our marketplace.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="mt-12 bg-white/5 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Revenue Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1/3 h-4 bg-purple-500 rounded"></div>
                <p className="flex-1">40% - Platform Development & Maintenance</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1/4 h-4 bg-blue-500 rounded"></div>
                <p className="flex-1">30% - Community Rewards & Staking</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1/5 h-4 bg-green-500 rounded"></div>
                <p className="flex-1">20% - Marketing & Partnerships</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[10%] h-4 bg-rose-500 rounded"></div>
                <p className="flex-1">10% - Emergency Fund</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Revenue;
