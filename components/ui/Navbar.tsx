import NextLink from 'next/link'
import { AppBar, Box, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { useContext, useState } from 'react'
import { UiContext } from '@/context/ui'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AuthContext } from '@/context/auth';
import { AvatarIcon } from '.';


export const Navbar = () => {

    const { isMenuOpen, toggleSideMenu } = useContext( UiContext )
    const { isLoggedIn, user, logout } = useContext( AuthContext )    

  return (
    <AppBar>
        <Toolbar>

            <IconButton
                size="large"
                edge="start"
                
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={ toggleSideMenu }
            >
                <MenuOutlinedIcon />
            </IconButton>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Obra |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Admin</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />
            
            <AvatarIcon name={ user?.name || '' } lastName={ user?.lastName || '' } role={ user?.role || '' } legajo={ user?.legajo || '' } />



            {/* Pantallas peque{as} */}


            {/* Pantallas grandes */}          

        </Toolbar>
    </AppBar>
  )
}
