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
    price1: '',
    price2: '',
    price3: ''
  });
  const [formMessage, setFormMessage] = useState('');
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const parsedValue = type === 'checkbox' ? checked : value;
    setFormValues({
      ...formValues,
      [name]: parsedValue,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^(\d{0,2}(\.\d{0,2})?)?$/;
    if (regex.test(value)) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    setIsThankYouOpen(true);

    const pricesValid = [formValues.price1, formValues.price2, formValues.price3].every(price => parseFloat(price) <= 99.99);

    if (
      formValues.nimi &&
      formValues.osoite &&
      formValues.paikkakunta &&
      formValues.accepted &&
      formValues.price1 &&
      formValues.price2 &&
      formValues.price3 &&
      pricesValid
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
          price1: '',
          price2: '',
          price3: ''
        });
      } else {
        setFormMessage('Error sending email. Please try again later.');
        onClose();
        setIsThankYouOpen(true);
      }
    } else {
      setFormMessage('Invalid input. Please check your entries.');
      onClose();
      setIsThankYouOpen(true);
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
                label="Baarin Nimi"
                name="nimi"
                value={formValues.nimi}
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
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography>Olut</Typography>
                <TextField
                  fullWidth
                  label="Hinta"
                  name="price1"
                  type="text"
                  value={formValues.price1}
                  onChange={handlePriceChange}
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
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography>Siideri</Typography>
                <TextField
                  fullWidth
                  label="Hinta"
                  name="price2"
                  type="text"
                  value={formValues.price2}
                  onChange={handlePriceChange}
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
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography>Lonkero</Typography>
                <TextField
                  fullWidth
                  label="Hinta"
                  name="price3"
                  type="text"
                  value={formValues.price3}
                  onChange={handlePriceChange}
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
