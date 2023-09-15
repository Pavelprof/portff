import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';

const PositionList = ({ positions }) => {
  return (
    <List>
      {positions.map((position, index) => (
        <ListItem key={index}>
          <ListItemText 
            primary={`${position.asset.name_asset} (${position.asset.ticker})`} 
            secondary={`Total Value: ${position.total_value} ${position.asset.currency}`}
          />
          <ListItemSecondaryAction>
            Quantity: {position.quantity_position}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PositionList;