import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from '@/interface/interface';
import { Padding } from '@mui/icons-material';

interface AdCarouselProps {
  onAdSelect: (location: { lat: number; lng: number }) => void;
  bars: Bar[];
}

const AdCarousel: React.FC<AdCarouselProps> = ({ onAdSelect, bars }) => {
  const barsWithAds = bars.filter(bar => bar.ad && (bar.ad.offer || bar.ad.timeRange)) as (Bar & { ad: NonNullable<Bar['ad']> })[];
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    if (barsWithAds.length > 0) {
      const interval = setInterval(() => {
        setCurrentAdIndex(prevIndex => (prevIndex + 1) % barsWithAds.length);
      }, 5000); // Change ad every 5 seconds

      return () => clearInterval(interval);
    }
  }, [barsWithAds]);

  if (barsWithAds.length === 0) {
    return (
      <Box style={{ cursor: 'pointer' }} sx={styles.adBanner}>
        <Typography variant="h6">Want your Bar to show here?</Typography>
      </Box>
    );
  }

  const barWithAd = barsWithAds[currentAdIndex];

  const handleAdClick = () => {
    onAdSelect({ lat: barWithAd.lat, lng: barWithAd.lng });
  };

  return (
    <Box onClick={handleAdClick} style={{ cursor: 'pointer' }} sx={styles.adBanner}>
      <Typography variant="h6">{barWithAd.name}</Typography>
      <Typography>{barWithAd.ad.offer}</Typography>
      <Typography>{barWithAd.ad.timeRange}</Typography>
    </Box>
  );
};

export default AdCarousel;

const styles = {
  adBanner: {
    height: '15vh',
    width: '100%',
    padding: 2
  },
};
