import { Divider, List, ListSubheader } from '@mui/material';

import { SideMenuItemObras, SideMenuItemOption } from '.';
import { sideMenu, sideMenuObra } from '../../config';
import { useRouter } from 'next/router';

export const SideMenuItemListAdmin = () => {

  const router = useRouter()


  return (

    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Admin Panel
        </ListSubheader>
      }
    >
      
    <SideMenuItemObras />
    {
      sideMenu.map( item => (
        <SideMenuItemOption
          key={ item.name }
          Avatar={ item.avatar }
          name={ item.name }
          url={ item.url }
        />
      ) )
    }

    </List>
  );
}

