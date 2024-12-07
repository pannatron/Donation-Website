import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Distribution = () => {
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
          <h1 className="text-4xl font-bold text-center mb-12">Token Distribution & Benefits</h1>
          
          {/* Distribution Chart */}
          <div className="bg-white/5 rounded-lg shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                {/* Custom pie chart using CSS - Colors swapped */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-rose-400" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 20% 0)' }}></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-400" style={{ clipPath: 'polygon(50% 50%, 20% 0, 50% 0)' }}></div>
                </div>
                {/* Percentage labels */}
                <div className="absolute top-[10%] left-[32%] bg-white/10 px-2 py-1 rounded shadow">20%</div>
                <div className="absolute bottom-[30%] left-[20%] bg-white/10 px-2 py-1 rounded shadow">80%</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Distribution Breakdown</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-4 h-4 mt-1 rounded-full bg-rose-400 mr-3"></div>
                    <div>
                      <span className="font-semibold">80% - Core Team Operations</span>
                      <p className="text-gray-300">Dedicated to marketing campaigns, team salaries, community events, and operational expenses.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 mt-1 rounded-full bg-blue-400 mr-3"></div>
                    <div>
                      <span className="font-semibold">20% - Development & Lifetime Support</span>
                      <p className="text-gray-300">Allocated for ongoing platform development, technical improvements, and continuous support.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Early Donor Benefits */}
          <div className="bg-white/5 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Early Donor Benefits</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="text-lg font-semibold">Exclusive Access</h4>
                  <p className="text-gray-300">Early donors get priority access to new features and platform updates before public release.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-lg font-semibold">Community Recognition</h4>
                  <p className="text-gray-300">Special badges and recognition in our community platforms and events.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="text-lg font-semibold">Voting Rights</h4>
                  <p className="text-gray-300">Participate in key platform decisions and feature prioritization.</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="text-lg font-semibold">Special Events</h4>
                  <p className="text-gray-300">VIP access to community events and exclusive online gatherings.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Distribution;
