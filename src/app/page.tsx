'use client';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Backdrop, Typography } from '@mui/material';
import Image from 'next/image';
import { getBars } from '@/services/api';
import { Bar } from '@/interface/interface';
import Map from '@/components/Map';
import Navigation from '@/components/Navigation';
import AdCarousel from '@/components/AdCorousel';
import Sad from '../assets/sad.svg';

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

  if (error) {
    return (
      <Box sx={styles.errorContainer}>
        <Image src={Sad} width={200} height={200} alt="see you soon" />
        <Typography variant="h6" sx={styles.errorMessage}>Pahoittelut Nyt On Kuppi Nurin</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.fullScreen}>
      <Navigation bars={bars} onBarClick={handleBarClick} />
      <Map selectedLocation={selectedLocation} bars={bars} />
      <AdCarousel onAdSelect={setSelectedLocation} bars={bars} />

      <Backdrop sx={styles.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ecece',
  },
  errorMessage: {
    marginBottom: '5px',
  },
};
