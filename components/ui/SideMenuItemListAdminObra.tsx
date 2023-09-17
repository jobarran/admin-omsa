import { Divider, List, ListSubheader } from '@mui/material';

import { SideMenuItemObras, SideMenuItemOption } from '.';
import { sideMenuObraCarga, sideMenuObra } from '../../config';
import { useContext } from 'react';
import { UiContext } from '@/context';

export const SideMenuItemListAdminObra = () => {

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
        ))
    }

    <Divider variant="middle" />

    </List>
  );
}

