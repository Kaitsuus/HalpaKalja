'use client';
import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';
import tuoppi from '../assets/tuoppi.png';
import Image from 'next/image';

interface ThankYouDialogProps {
  open: boolean;
  onClose: () => void;
}

const ThankYouDialog: React.FC<ThankYouDialogProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 2000); // Close after 2 seconds
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [open, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: '#00475A',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Image src={tuoppi} height={100} width={100} alt='tuoppi' />
        <DialogTitle>Kiitos</DialogTitle>
        <DialogContent>
          <Typography>Kiitos lisäämme ravintolan mahdollisimman pian</Typography>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ThankYouDialog;
