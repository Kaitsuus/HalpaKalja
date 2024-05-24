import React, { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';
import { Box, Typography, IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Bar } from '../interface/interface';
import beerIco from '../assets/beerIco.svg';

export interface MapClientProps {
  selectedLocation: { lat: number, lng: number } | null;
  bars: Bar[];
}

const MapClient: React.FC<MapClientProps> = ({ selectedLocation, bars }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const helsinkiCoords: L.LatLngTuple = useMemo(() => [60.1719, 24.9414], []);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const initialMap = L.map(mapContainerRef.current, {
        center: helsinkiCoords,
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(initialMap);

      const beerIcon = new L.Icon({
        iconUrl: beerIco.src,
        iconSize: [35, 35],
        iconAnchor: [17.5, 35],
        popupAnchor: [0, -35],
      });

      bars.forEach((bar: Bar) => {
        const popupContent = document.createElement('div');
        const PopupComponent = () => (
          <Box>
            <Typography>{bar.name}</Typography>
            <Typography>
              {Object.entries(bar.drinks).map(([drink, price]) => (
                <span key={drink}>{drink}: €{price}<br /></span>
              ))}
              {typeof bar.open_hours === 'string' ? (
                <span>Open: {bar.open_hours}</span>
              ) : (
                Object.entries(bar.open_hours).map(([day, hours]) => (
                  <span key={day}>{day}: {hours}<br /></span>
                ))
              )}
            </Typography>
            {bar.ad && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Special Offer: {bar.ad.offer} <br />
                  Time Range: {bar.ad.timeRange}
                </Typography>
              </Box>
            )}
          </Box>
        );

        const root = createRoot(popupContent);
        root.render(<PopupComponent />);

        const marker = L.marker([bar.lat, bar.lng], { icon: beerIcon })
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
  }, [bars, helsinkiCoords]);

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
        <IconButton color="primary" onClick={goToHelsinki} aria-label="Back to Helsinki">
          <LocationCityIcon />
        </IconButton>
      </div>
    </>
  );
};

export default MapClient;
