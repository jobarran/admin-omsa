import { useContext } from "react"
import { useRouter } from "next/router"
import { UiContext } from "@/context/ui"
import { AuthContext } from "@/context/auth"
import { SideMenuItemListAdmin, SideMenuItemListNoObra, SideMenuItemListObra } from ".";
import { Box, Divider, Drawer, List } from "@mui/material"
import { SideMenuItemListAdminObra } from "./SideMenuItemListAdminObra";


export const SideMenu = () => {

    const router = useRouter()
    const { isMenuOpen, toggleSideMenu, activeObra } = useContext( UiContext )
    const { user } = useContext( AuthContext )  

  return (
    <Drawer
        open={ isMenuOpen }
        onClose={ toggleSideMenu }
        anchor='left'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out'}}
        transitionDuration={ 250 }
    >
        <Box sx={{ width: 250 }}>
            
        <List>

            {
                user?.role === 'admin' && (
                    activeObra === undefined
                    ? (
                        <SideMenuItemListAdmin />
                    )
                    : (
                        <>
                        <SideMenuItemListAdminObra />
                        <SideMenuItemListAdmin />
                        </>
                    )
                )
            }

            {
                user?.role === 'user' && (
                    activeObra === undefined
                    ? (
                        <SideMenuItemListNoObra />
                    )
                    : (
                        <>
                        <SideMenuItemListObra />
                        <SideMenuItemListNoObra />
                        </>
                    )
                )
            }

      </List>
        </Box>
    </Drawer>
  )
}