// components/PopupForm.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ThankYouDialog from './ThankYouDialog';

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    nimi: '',
    osoite: '',
    paikkakunta: '',
    accepted: false,
    drink1: '',
    price1: '',
    drink2: '',
    price2: '',
    drink3: '',
    price3: ''
  });
  const [formMessage, setFormMessage] = useState('');
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    onClose();
    setIsThankYouOpen(true);
    e.preventDefault();
    if (
      formValues.nimi &&
      formValues.osoite &&
      formValues.paikkakunta &&
      formValues.accepted &&
      formValues.drink1 && formValues.price1 &&
      formValues.drink2 && formValues.price2 &&
      formValues.drink3 && formValues.price3
    ) {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        setFormValues({
          nimi: '',
          osoite: '',
          paikkakunta: '',
          accepted: false,
          drink1: '',
          price1: '',
          drink2: '',
          price2: '',
          drink3: '',
          price3: ''
        });
      } else {
        setFormMessage('Error sending email. Please try again later.');
        onClose();
        setIsThankYouOpen(true);
      }
    }
  };

  return (
  <>
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ backgroundColor: '#00475A', color: 'white' }}>
        <DialogTitle>Ilmianna Baari</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '300px', padding: '5px', color: 'white', borderRadius: '5px' }}>
            <TextField
              fullWidth
              label="Nimi"
              name="nimi"
              value={formValues.nimi}
              onChange={handleInputChange}
              required
              margin="normal"
              sx={{
                '& .MuiInputBase-root': {
                  color: 'black', // Text color
                  backgroundColor: 'white', // Background color
                },
                '& .MuiFormLabel-root': {
                  color: 'Black',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Border color
                },
              }}
            />
            <TextField
              fullWidth
              label="Osoite"
              name="osoite"
              value={formValues.osoite}
              onChange={handleInputChange}
              required
              margin="normal"
              sx={{
                '& .MuiInputBase-root': {
                  color: 'black',
                  backgroundColor: 'white',
                },
                '& .MuiFormLabel-root': {
                  color: 'Black',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
              }}
            />
            <TextField
              fullWidth
              label="Paikkakunta"
              name="paikkakunta"
              value={formValues.paikkakunta}
              onChange={handleInputChange}
              required
              margin="normal"
              sx={{
                '& .MuiInputBase-root': {
                  color: 'black',
                  backgroundColor: 'white',
                },
                '& .MuiFormLabel-root': {
                  color: 'Black',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <TextField
                fullWidth
                label="Juoma"
                name="drink1"
                value={formValues.drink1}
                onChange={handleInputChange}
                required
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    color: 'black',
                    backgroundColor: 'white',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'Black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Hinta"
                name="price1"
                value={formValues.price1}
                onChange={handleInputChange}
                required
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    color: 'black',
                    backgroundColor: 'white',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'Black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <TextField
                fullWidth
                label="Juoma"
                name="drink2"
                value={formValues.drink2}
                onChange={handleInputChange}
                required
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    color: 'black',
                    backgroundColor: 'white',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'Black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Hinta"
                name="price2"
                value={formValues.price2}
                onChange={handleInputChange}
                required
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    color: 'black',
                    backgroundColor: 'white',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'Black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <TextField
                fullWidth
                label="Juoma"
                name="drink3"
                value={formValues.drink3}
                onChange={handleInputChange}
                required
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    color: 'black',
                    backgroundColor: 'white',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'Black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Hinta"
                name="price3"
                value={formValues.price3}
                onChange={handleInputChange}
                required
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    color: 'black',
                    backgroundColor: 'white',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'Black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
            </Box>
            <FormControlLabel
              control={<Checkbox name="accepted" checked={formValues.accepted} onChange={handleInputChange} required sx={{ color: 'white' }} />}
              label={<Typography sx={{ color: 'white' }}>Antamani tiedot ovat oikein.</Typography>}
            />
            {formMessage && <Typography variant="body2" sx={{ marginTop: '10px', color: 'green' }}>{formMessage}</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Sulje</Button>
          <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">Lähetä</Button>
        </DialogActions>
      </Box>
    </Dialog>
    <ThankYouDialog open={isThankYouOpen} onClose={() => setIsThankYouOpen(false)} />
  </>
);
};

export default PopupForm;
