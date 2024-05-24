'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { Bar } from '../interface/interface';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
});

export interface MapProps {
  selectedLocation: { lat: number, lng: number } | null;
  bars: Bar[];
}

const Map: React.FC<MapProps> = (props) => {
  return <MapClient {...props} />;
};

export default Map;
