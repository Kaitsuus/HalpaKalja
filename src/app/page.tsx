'use client';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getBars } from '@/services/api';
import { Bar } from '@/interface/interface';
import Map from '@/components/Map';
import Navigation from '@/components/Navigation';
import AdCarousel from '@/components/AdCorousel';

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [bars, setBars] = useState<Bar[]>([]);

  const handleBarClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const barsData = await getBars();
        setBars(barsData);
        console.log(barsData);
      } catch (error) {
        console.error('Error fetching bars:', error);
      }
    };
    fetchBars();
  }, []);

  return (
    <Box sx={styles.fullScreen}>
      <Navigation bars={bars} onBarClick={handleBarClick} />
      <Map selectedLocation={selectedLocation} bars={bars} />
      <AdCarousel onAdSelect={setSelectedLocation} bars={bars}/>
    </Box>
  );
  
};

export default HomePage;

const styles = {
  fullScreen: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
};
