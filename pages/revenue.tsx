import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Revenue = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const scaleOnHover = {
    scale: 1.02,
    transition: { duration: 0.2 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-gradient-xy"></div>

      {/* Tiger Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src="/tiger.jpg"
          alt="Tiger Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </motion.div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/"
            className="relative group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="relative z-10">← Back to Donation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 
            className="text-4xl md:text-5xl font-bold text-center mb-12"
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
            Revenue Streams & Distribution
          </h1>
          
          {/* Revenue Streams */}
          <div className="grid gap-8">
            {/* Community Donations */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-300"
              whileHover={scaleOnHover}
              {...fadeInUp}
            >
              <div className="flex items-start gap-4">
                <div className="bg-pink-500/20 p-4 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                  <p className="text-gray-300">Direct donations from our supportive community members helping drive our mission forward.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-pink-500/20 rounded-full text-sm">Crypto Donations</span>
                    <span className="px-2 py-1 bg-pink-500/20 rounded-full text-sm">Fiat Donations</span>
                    <span className="px-2 py-1 bg-pink-500/20 rounded-full text-sm">NFT Support</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* E-commerce Fees */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              whileHover={scaleOnHover}
              {...fadeInUp}
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-4 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">E-commerce Fees</h3>
                  <p className="text-gray-300">10% transaction fee from third-party sellers on the platform.</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full">
                  <span className="text-sm font-semibold">10%</span>
                </div>
              </div>
            </motion.div>

            {/* Lotto System */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              whileHover={scaleOnHover}
              {...fadeInUp}
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Lotto System</h3>
                  <p className="text-gray-300">10% allocation from total lotto system revenue.</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full">
                  <span className="text-sm font-semibold">10%</span>
                </div>
              </div>
            </motion.div>

            {/* Partner Service Fees */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300"
              whileHover={scaleOnHover}
              {...fadeInUp}
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Partner Services</h3>
                  <p className="text-gray-300">10-20% fee from hospitality, travel, aviation, and tour services.</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full">
                  <span className="text-sm font-semibold">15%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Revenue Distribution */}
          <motion.div 
            className="mt-16 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-white/10"
            {...fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Revenue Distribution</h2>
            <div className="space-y-6">
              {/* Platform Operations */}
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[40%] h-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <p className="flex-1 font-semibold">Platform Operations (40%)</p>
                </div>
              </motion.div>

              {/* NFT Holder Rewards */}
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[20%] h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <p className="flex-1 font-semibold">NFT Holder Rewards (20%)</p>
                </div>
              </motion.div>

              {/* Community Engagement */}
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[20%] h-6 bg-gradient-to-r from-green-500 to-green-700 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <p className="flex-1 font-semibold">Community Engagement & Staking (20%)</p>
                </div>
              </motion.div>

              {/* Marketing & Partnerships */}
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[10%] h-6 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <p className="flex-1 font-semibold">Marketing & Partnerships (10%)</p>
                </div>
              </motion.div>

              {/* Emergency Fund */}
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[10%] h-6 bg-gradient-to-r from-red-500 to-red-700 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <p className="flex-1 font-semibold">Emergency Fund (10%)</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Revenue;
