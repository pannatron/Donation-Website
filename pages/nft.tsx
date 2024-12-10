import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NFTGallery from '../components/NFTGallery';

const NFT = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/20 via-indigo-600/30 to-transparent" />
      </div>

      {/* Enhanced Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
            top: '20%',
            left: '30%',
            animation: 'float 20s infinite linear'
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
            bottom: '20%',
            right: '30%',
            animation: 'float 25s infinite linear reverse'
          }}
        />
      </div>

      <main className="relative z-10">
        <div className="container mx-auto px-4 pt-4">
          <div className="mb-4">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-purple-500/20 to-indigo-600/20 hover:from-purple-500/30 hover:to-indigo-600/30 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 backdrop-blur-sm border border-purple-500/20"
            >
              ← Back to Donation
            </Link>
          </div>

          <div className="text-center mb-8">
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
              Discover the Khaitun NFT Collection
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm">
              Own a piece of Khaitun's legacy and unlock exclusive benefits! Each NFT comes with unique privileges, including revenue sharing from the Khaitun ecosystem, premium rewards, and the power to shape our community's future.
            </p>
          </div>

          {/* NFT Gallery */}
          <div className="mb-24">
            <NFTGallery />
          </div>

          {/* Benefits Grid with Enhanced Styling */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-purple-500/5 to-indigo-600/5 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-300">
                Revenue Sharing & Benefits
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 p-2 rounded-lg mt-1">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-200">Ecosystem Revenue Share</h4>
                    <p className="text-gray-300 text-sm">Receive proportional revenue share from the Khaitun Ecosystem</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 p-2 rounded-lg mt-1">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-200">Premium Rewards</h4>
                    <p className="text-gray-300 text-sm">Free services and exclusive premium giveaways</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500/5 to-indigo-600/5 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-300">
                Exclusive Access
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 p-2 rounded-lg mt-1">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-200">Early Access</h4>
                    <p className="text-gray-300 text-sm">Priority access to special services and tourism packages</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 p-2 rounded-lg mt-1">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-200">Governance Rights</h4>
                    <p className="text-gray-300 text-sm">Vote on future ecosystem decisions and developments</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

         {/* Social Integration with Enhanced Styling */}
<div className="bg-gradient-to-br from-purple-500/5 to-indigo-600/5 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20 mb-12 max-w-4xl mx-auto text-center hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all">
  <h3 className="text-2xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-300">
    Join Our Community
  </h3>
  <div className="flex justify-center gap-6">
    {/* Telegram */}
    <a
      href="https://t.me/KhaitunTiger"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 hover:from-purple-500/30 hover:to-indigo-600/30 text-white p-4 rounded-full transition-all transform hover:scale-110 border border-purple-500/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.954 16.569l-.418 4.705c.617 0 .884-.26 1.202-.573l2.895-2.735 5.993 4.354c1.099.611 1.878.292 2.15-.977l3.892-18.369h-.001c.326-1.531-.552-2.118-1.628-1.739L1.257 9.417c-1.496.584-1.475 1.414-.256 1.789l4.685 1.459 10.905-6.844c.513-.331.978-.147.593.184L9.954 16.569z" />
      </svg>
    </a>

    {/* X (Twitter) */}
    <a
      href="https://x.com/khaituntiger?s=21"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 hover:from-purple-500/30 hover:to-indigo-600/30 text-white p-4 rounded-full transition-all transform hover:scale-110 border border-purple-500/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    </a>

    {/* Discord */}
    <a
      href="https://discord.gg/kvQndzHh"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 hover:from-purple-500/30 hover:to-indigo-600/30 text-white p-4 rounded-full transition-all transform hover:scale-110 border border-purple-500/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
      </svg>
    </a>
  </div>
</div>

        </div>
      </main>
    </div>
  );
};

export default NFT;
