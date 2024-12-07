import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NFT = () => {
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
          <h1 className="text-4xl font-bold text-center mb-12">Khaitun NFT</h1>
          
          {/* NFT Overview */}
          <div className="bg-white/5 rounded-lg shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square w-full max-w-[400px] mx-auto">
                <Image
                  src="/tiger.jpg"
                  alt="Khaitun NFT Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Limited Edition Collection</h2>
                <p className="text-gray-300 mb-6">
                  Exclusive NFTs that grant special privileges and access to premium features within the Khaitun ecosystem.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Total Supply: 10,000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mint Price: TBA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NFT Benefits */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Utility & Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-purple-500/20 p-2 rounded mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Trading Fee Discounts</h4>
                    <p className="text-gray-300 text-sm">Reduced trading fees on the platform</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-500/20 p-2 rounded mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Exclusive Access</h4>
                    <p className="text-gray-300 text-sm">Priority access to new features and launches</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-500/20 p-2 rounded mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Governance Rights</h4>
                    <p className="text-gray-300 text-sm">Participate in platform governance decisions</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Rarity & Traits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-2 rounded mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Multiple Tiers</h4>
                    <p className="text-gray-300 text-sm">5 rarity tiers with unique benefits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-2 rounded mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dynamic Attributes</h4>
                    <p className="text-gray-300 text-sm">Evolving traits based on holder activity</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-2 rounded mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Special Editions</h4>
                    <p className="text-gray-300 text-sm">Limited edition NFTs with unique designs</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-purple-600/20 rounded-lg px-6 py-3 border border-purple-500">
              <p className="text-lg font-semibold">Minting Coming Soon</p>
              <p className="text-gray-300 text-sm">Stay tuned for the official launch announcement</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NFT;
