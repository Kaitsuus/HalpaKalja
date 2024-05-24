'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Backdrop, Alert } from '@mui/material';
import { getBars } from '@/services/api';
import { Bar } from '@/interface/interface';
import Map from '@/components/Map';
import Navigation from '@/components/Navigation';
import AdCarousel from '@/components/AdCorousel';

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBarClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const barsData = await getBars();
        setBars(barsData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching bars. Please try again later.');
        setLoading(false);
      }
    };
    fetchBars();
  }, []);

  return (
    <Box sx={styles.fullScreen}>
      <Navigation bars={bars} onBarClick={handleBarClick} />
      <Map selectedLocation={selectedLocation} bars={bars} />
      <AdCarousel onAdSelect={setSelectedLocation} bars={bars} />

      <Backdrop sx={styles.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
      {error && (
        <Alert severity="error" sx={styles.errorAlert}>{error}</Alert>
      )}
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
    position: 'relative',
  },
  backdrop: {
    color: '#fff',
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
  errorAlert: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  },
};
