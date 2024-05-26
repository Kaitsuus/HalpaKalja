import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bar } from '../interface/interface';
import topFive from '../assets/topFive.svg';
import treAmigos from '../assets/treAmigos.svg';
import Image from 'next/image';

export interface NavigationProps {
  bars: Bar[];
  onBarClick: (lat: number, lng: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ bars, onBarClick }) => {
  const [isTop5Open, setIsTop5Open] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
  type DayOfWeek = (typeof daysOfWeek)[number];
  const today: DayOfWeek = daysOfWeek[new Date().getDay()];

  const getTop5CheapestBars = () => {
    const barPrices = bars.map(bar => {
      const cheapestDrink = Math.min(...Object.values(bar.drinks));
      return {
        ...bar,
        cheapestDrink
      };
    });

    barPrices.sort((a, b) => a.cheapestDrink - b.cheapestDrink);

    return barPrices.slice(0, 5);
  };

  const toggleTop5Drawer = () => {
    setIsTop5Open(!isTop5Open);
  };

  const toggleInfoDrawer = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const top5List = () => (
    <div
      role="presentation"
      onClick={toggleTop5Drawer}
      onKeyDown={toggleTop5Drawer}
    >
      <List>
        <Box p={2}>
          <ListItemText primary="Top 5 Cheapest Bars" />
          {getTop5CheapestBars().map((bar, index) => (
            <ListItem button key={index} onClick={() => onBarClick(bar.lat, bar.lng)} alignItems="flex-start">
              <Box>
                <ListItemText primary={bar.name} />
                {Object.entries(bar.drinks).map(([drink, price]) => (
                  <Typography key={drink} variant="body2">{drink}: €{price}</Typography>
                ))}
                {typeof bar.open_hours === 'string' ? (
                  <Typography variant="body2">Open: {bar.open_hours}</Typography>
                ) : (
                  bar.open_hours[today] && (
                    <>
                      <Typography variant="body2">Open: {bar.open_hours[today]?.hours}</Typography>
                      <Typography variant="body2">Offer: {bar.open_hours[today]?.offer}</Typography>
                    </>
                  )
                )}
              </Box>
            </ListItem>
          ))}
        </Box>
      </List>
    </div>
  );

  const infoList = () => (
    <div
      role="presentation"
      onClick={toggleInfoDrawer}
      onKeyDown={toggleInfoDrawer}
    >
      <List>
        <Box p={2} textAlign="center">
          <Image src={treAmigos} height={150} width={150} alt="Three Amigos" />
          <Typography variant="h6">Yhdet.fi</Typography>
          <Typography variant="body2">Email: yhdelleapp@gmail.com</Typography>
          {/* Add more info here */}
        </Box>
      </List>
    </div>
  );

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="flex-end" position="absolute" right={16} zIndex="tooltip">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleInfoDrawer}
          sx={{ color: '#000' }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton color="primary" onClick={toggleTop5Drawer} aria-label="Show top 5 cheapest bars">
          <Image src={topFive} height={30} width={30} alt='cheapest icon' />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={isTop5Open} onClose={toggleTop5Drawer}>
        {top5List()}
      </Drawer>
      <Drawer anchor="right" open={isInfoOpen} onClose={toggleInfoDrawer}>
        {infoList()}
      </Drawer>
    </>
  );
};

export default Navigation;
