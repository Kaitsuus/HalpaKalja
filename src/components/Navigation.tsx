import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bar } from '../interface/interface';

export interface NavigationProps {
  bars: Bar[];
  onBarClick: (lat: number, lng: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ bars, onBarClick }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
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

  return (
    <>
      <Box display="flex" justifyContent="flex-end" position="absolute" right={16} zIndex="tooltip">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{ color: '#000' }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </>
  );
};

export default Navigation;
