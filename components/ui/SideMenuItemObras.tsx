import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import { UiContext } from '@/context';
import { useObras } from '@/hooks';
import { AuthContext } from '@/context/auth';

export const SideMenuItemObras = () => {

    const { isMenuOpen, toggleSideMenu } = useContext( UiContext )
    const { user } = useContext( AuthContext )  
    const { obras, error, isLoading } = useObras('/obras')
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const handleClick = () => {
        setOpen(!open);
    };

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url)
    }


  return (

    <>
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <ApartmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Obras" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

            {
                obras.map( obra => (
                  <ListItemButton 
                    key={obra.name}
                    disabled={ user?.role === 'user' && !user?.obra?.includes(obra.idObra) }
                    onClick={ () => navigateTo(`/obra/${obra.idObra}`) }
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon >
                        <ArrowRightOutlinedIcon />
                        </ListItemIcon>
                    <ListItemText primary={obra.name} />
                  </ListItemButton>
                ))
            }

            </List>
        </Collapse>
      </>
  );
}

