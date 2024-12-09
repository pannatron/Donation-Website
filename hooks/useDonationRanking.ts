import { useState, useEffect } from 'react';
import { getDonorRankings } from '../utils/solana-transactions';

interface DonorRank {
  address: string;
  amount: number;
}

export const useDonationRanking = () => {
  const [rankings, setRankings] = useState<DonorRank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const fetchRankings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const donorRankings = await getDonorRankings();
      setRankings(donorRankings);
    } catch (err) {
      console.error('Error fetching rankings:', err);
      setError('Failed to load rankings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch on initial mount
  useEffect(() => {
    fetchRankings();
  }, []);

  const refresh = async () => {
    await fetchRankings();
  };

  return {
    rankings,
    isLoading,
    error,
    showAll,
    setShowAll,
    totalDonors: rankings.length,
    refresh
  };
};
