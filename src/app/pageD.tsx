'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Sad from '../assets/beericonsad.jpg'

const HomePageD = () => {
 return (
  <Box sx={styles.fullScreen}>
    <Box display="flex" flexDirection={'column'} alignItems="center">
    <Image
          src={Sad}
          width={200}
          height={200}
          alt="see you soon"
    />
    <Typography>Vielä On Kuppi Nurin</Typography>
    </Box>
</Box>
 );
};

export default HomePageD;

const styles = {
  fullScreen: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
};
