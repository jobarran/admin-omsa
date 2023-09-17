import React, { useContext } from 'react'

import { List, ListSubheader, Divider } from '@mui/material';


import { UiContext } from '@/context';
import { SideMenuItemObras, SideMenuItemOption } from '.';
import { sideMenuObra, sideMenuObraCarga } from '@/config';

export const SideMenuItemListObra = () => {

  const { activeObra } = useContext( UiContext )


  return (

    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
              {activeObra?.idObra} | {activeObra?.name}
        </ListSubheader>
      }
    >

    {
      
      sideMenuObraCarga.map( item => (
        <SideMenuItemOption
          key={ item.name }
          Avatar={ item.avatar }
          name={ item.name }
          url={ `/obra/${activeObra?.idObra}` + item.url }
        />
      ))
    }

    <Divider variant="middle" />
        
    {
      sideMenuObra.map( item => (
        <SideMenuItemOption
        key={ item.name }
        Avatar={ item.avatar }
        name={ item.name }
        url={ `/obra/${activeObra?.idObra}` + item.url }
        />
        ) )
      }

    <Divider variant="middle" />


    </List>
  );
}

