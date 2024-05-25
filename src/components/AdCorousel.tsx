import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from '@/interface/interface';

interface AdCarouselProps {
  onAdSelect: (location: { lat: number; lng: number }) => void;
  bars: Bar[];
}

const AdCarousel: React.FC<AdCarouselProps> = ({ onAdSelect, bars }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
  type DayOfWeek = (typeof daysOfWeek)[number];
  const today: DayOfWeek = daysOfWeek[new Date().getDay()];

  const barsWithOffers = bars.filter(bar => {
    if (typeof bar.open_hours === 'string') {
      return false;
    }
    const todayDetails = bar.open_hours[today];
    return todayDetails && todayDetails.offer;
  });

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    if (barsWithOffers.length > 0) {
      const interval = setInterval(() => {
        setCurrentAdIndex(prevIndex => (prevIndex + 1) % barsWithOffers.length);
      }, 5000); // Change ad every 5 seconds

      return () => clearInterval(interval);
    }
  }, [barsWithOffers]);

  if (barsWithOffers.length === 0) {
    return (
      <Box style={{ cursor: 'pointer' }} sx={styles.adBanner}>
        <Typography variant="h6">Want your Bar to show here?</Typography>
      </Box>
    );
  }

  const barWithOffer = barsWithOffers[currentAdIndex];
  const todayDetails = typeof barWithOffer.open_hours !== 'string' ? barWithOffer.open_hours[today] : null;

  const handleAdClick = () => {
    onAdSelect({ lat: barWithOffer.lat, lng: barWithOffer.lng });
  };

  return (
    <Box onClick={handleAdClick} style={{ cursor: 'pointer' }} sx={styles.adBanner}>
      <Typography variant="h6">{barWithOffer.name}</Typography>
      {todayDetails && (
        <>
          <Typography>{todayDetails.offer}</Typography>
          <Typography>{todayDetails.hours}</Typography>
        </>
      )}
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
