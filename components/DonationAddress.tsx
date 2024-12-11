import { useState } from 'react';
import { donationPubKey } from '../utils/solana-transactions';

export const DonationAddress = () => {
  const [showCopied, setShowCopied] = useState(false);
  const donationAddress = donationPubKey;

  const copyAddress = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(donationAddress);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } else {
        // Fallback for environments where clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = donationAddress;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
          console.error('Fallback: Copying failed', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg">
      <p className="text-gray-300 mb-3">Donation Address:</p>
      <div className="flex items-center justify-center gap-3">
        <code className="bg-black/30 px-4 py-2.5 rounded-lg text-sm font-mono">{donationAddress}</code>
        <button
          onClick={copyAddress}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-colors text-sm relative"
        >
          {showCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};
