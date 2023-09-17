import React from 'react'

import { List, ListSubheader } from '@mui/material';

import { SideMenuItemObras } from '.';

export const SideMenuItemListNoObra = () => {

  return (

    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Seleccionar Obra
        </ListSubheader>
      }
    >
        
      <SideMenuItemObras />

    </List>
  );
}

