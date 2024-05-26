'use client';
import React, { useEffect, useRef, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';
import { Box, Typography, IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Backdrop } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Bar } from '../interface/interface';
import verifiedIcon from '../assets/cheapMap.svg';
import Image from 'next/image';
import treAmigos from '../assets/treAmigos.svg';
import happyIcon from '../assets/default.svg';
import '../util/customLeafletStyles.css';
import noPriceIcon from '../assets/mapgray.svg';
import unVerifiedIcon from '../assets/unverified.svg';

export interface MapClientProps {
  selectedLocation: { lat: number, lng: number } | null;
  bars: Bar[];
}

const MapClient: React.FC<MapClientProps> = ({ selectedLocation, bars }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const helsinkiCoords: L.LatLngTuple = useMemo(() => [60.1719, 24.9414], []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentBar, setCurrentBar] = useState<Bar | null>(null);
  const [prices, setPrices] = useState({ olut: '', siideri: '', lonkero: '' });
  const [loading, setLoading] = useState(false);
  const [submittedBars, setSubmittedBars] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const initialMap = L.map(mapContainerRef.current, {
        center: helsinkiCoords,
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(initialMap);

      const verifiedIconInstance = new L.Icon({
        iconUrl: verifiedIcon.src,
        iconSize: [50, 50],
        iconAnchor: [19.5, 37],
        popupAnchor: [0, -35],
      });

      const noPriceIconInstance = new L.Icon({
        iconUrl: noPriceIcon.src,
        iconSize: [50, 50],
        iconAnchor: [19.5, 37],
        popupAnchor: [0, -35],
      });

      const unVerifiedIconInstance = new L.Icon({
        iconUrl: unVerifiedIcon.src,
        iconSize: [50, 50],
        iconAnchor: [19.5, 37],
        popupAnchor: [0, -35],
      });

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
      type DayOfWeek = (typeof daysOfWeek)[number];
      const today: DayOfWeek = daysOfWeek[new Date().getDay()];

      bars.forEach((bar: Bar) => {
        const popupContent = document.createElement('div');
        const PopupComponent = () => {
          const todayDetails = typeof bar.open_hours !== 'string' ? bar.open_hours[today] : null;

          const handlePriceButtonClick = () => {
            setCurrentBar(bar);
            setIsPopupOpen(true);
          };

          return (
            <Box style={{ position: 'relative' }}>
              <Box style={{ position: 'absolute', top: '-150px', left: '58%', transform: 'translateX(-50%)' }}>
                <Image src={treAmigos} height={250} width={250} alt='Three beers' />
              </Box>
              <Box style={{ textAlign: 'center', padding: '5px', maxWidth: '200px', color: 'white' }}>
                <Typography variant="h6" style={{ marginTop: '50px' }}>{bar.name}</Typography>
                <Typography>
                  {bar.verified === false && (
                    <Typography variant="body2" color="yellow">HUOM! Hinnat Tarkastuksessa!</Typography>
                  )}
                  <Box style={{ marginBottom: '10px' }}>
                    {Object.entries(bar.drinks).length > 0 ? (
                      Object.entries(bar.drinks).map(([drink, price]) => (
                        <span key={drink}>{drink}: €{price}<br /></span>
                      ))
                    ) : (
                      <Box>
                        <span>Oops!</span><br />
                        <span>Meillä ei ole vielä hintoja.</span>
                        {submittedBars.has(bar.id) ? (
                          <Typography variant="body2" color="yellow">Kiitos Tarkastamme Hinnat Pian!</Typography>
                        ) : (
                          <Button variant="contained" color="secondary" onClick={handlePriceButtonClick} disabled={submittedBars.has(bar.id)} sx={{ marginTop: '5px' }}>Ilmoita hinta</Button>
                        )}
                      </Box>
                    )}
                  </Box>
                  {todayDetails ? (
                    todayDetails.offer ? (
                      <>
                        <span>Auki: {todayDetails.hours}</span><br />
                        <span>HappyHour: {todayDetails.offer}</span>
                      </>
                    ) : (
                      <span>Auki: {todayDetails.hours}</span>
                    )
                  ) : (
                    <span>Suljettu Tänään</span>
                  )}
                </Typography>
              </Box>
            </Box>
          );
        };

        const root = createRoot(popupContent);
        root.render(<PopupComponent />);

        let icon;
        if (bar.verified === true) {
          icon = verifiedIconInstance;
        } else if (bar.verified === false) {
          icon = unVerifiedIconInstance;
        } else {
          icon = noPriceIconInstance;
        }

        const marker = L.marker([bar.lat, bar.lng], { icon })
          .addTo(initialMap)
          .bindPopup(popupContent);

        markersRef.current[bar.name] = marker;
      });

      mapRef.current = initialMap;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [bars, helsinkiCoords, submittedBars]);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo([selectedLocation.lat, selectedLocation.lng], 16, {
        animate: true,
        duration: 1.3
      });

      setTimeout(() => {
        Object.values(markersRef.current).forEach(marker => {
          if (marker.getLatLng().lat === selectedLocation.lat && marker.getLatLng().lng === selectedLocation.lng) {
            marker.openPopup();
          }
        });
      }, 1400);
    }
  }, [selectedLocation]);

  const goToHelsinki = () => {
    if (mapRef.current) {
      mapRef.current.setView(helsinkiCoords, 13);
    }
  };

  const goToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.locate({ setView: true, maxZoom: 13, watch: false });
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setCurrentBar(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^(\d{0,2}(\.\d{0,2})?)?$/;
    if (regex.test(value)) {
      setPrices(prevPrices => ({
        ...prevPrices,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBar) {
      setLoading(true);
      const { id, ...barWithoutId } = currentBar;
      const updatedBar = {
        ...barWithoutId,
        drinks: {
          Olut: parseFloat(prices.olut),
          Siideri: parseFloat(prices.siideri),
          Lonkero: parseFloat(prices.lonkero),
        },
      };

      try {
        const response = await fetch(`/api/bars/${currentBar.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBar),
        });

        if (response.ok) {
          setLoading(false);
          setSubmittedBars(prev => new Set(prev).add(currentBar.id));
          setIsPopupOpen(false);
        } else {
          setLoading(false);
          console.error('Failed to update bar');
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <div ref={mapContainerRef} id="map" style={{ height: '85vh', width: '100%' }}></div>
      <div style={{
        position: 'absolute',
        top: 40, right: 16,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <IconButton color="primary" onClick={goToCurrentLocation} aria-label="Go to current location">
          <MyLocationIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => setIsPopupOpen(true)} aria-label="Add a new bar">
          <Image src={happyIcon} height={35} width={35} alt='Happy beer' />
        </IconButton>
      </div>
      <Dialog open={isPopupOpen} onClose={handlePopupClose}>
        <Backdrop open={loading} style={{ zIndex: 999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>Ilmoita hinnat</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Olut"
              name="olut"
              type="text"
              value={prices.olut}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 5 }}
            />
            <TextField
              label="Siideri"
              name="siideri"
              type="text"
              value={prices.siideri}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 5 }}
            />
            <TextField
              label="Lonkero"
              name="lonkero"
              type="text"
              value={prices.lonkero}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 5 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose} color="primary" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default MapClient;
