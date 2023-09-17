import { useRouter } from 'next/router';
import React, { FC, useContext, useState } from 'react'

import { ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material';

import { UiContext } from '@/context';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Props {
    name: string,
    Avatar: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    url: string,
}

export const SideMenuItemOption: FC<Props>  = ({ name, url, Avatar }) => {

    const { toggleSideMenu } = useContext( UiContext )
    const [open, setOpen] = useState(false);
    const router = useRouter()

    


    const handleClick = () => {
        setOpen(!open);
    };

    const navigateTo = () => {
        toggleSideMenu();
        router.push(url)
    }


  return (
        <ListItemButton onClick={handleClick}>
            <ListItemIcon >
                <Avatar />
            </ListItemIcon>
            <ListItemText
                primary={ name }
                onClick={ () => navigateTo() }
            />
        </ListItemButton>
  );
}

