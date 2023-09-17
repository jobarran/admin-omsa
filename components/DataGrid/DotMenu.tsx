import { MoreVert } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { FC, useState } from "react";

interface Props {
    handleAutoFill: () => void,
    handleSaveData: () => void
}

export const DotMenu:FC<Props> = ({handleAutoFill, handleSaveData}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const HandleActionMenu = (action: string) => {
        switch (action) {
        case 'saveData':
            handleSaveData()
            break;
        case 'autocompletar':
            handleAutoFill()
            break;
        case 'actualizarPersonal':
            
            break;
        
        default:
            break;
        }
        handleCloseMenu()
    }


    return (
    <>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ display:{xs:'flex', md:'none'} }}
        >
            <MoreVert />
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
        >
            <MenuItem onClick={ () => HandleActionMenu('saveData') }>
                Guardar
            </MenuItem>
            <MenuItem onClick={ () => HandleActionMenu('autocompletar') }>
                Autocompletar
            </MenuItem>
            <MenuItem onClick={ () => HandleActionMenu('actualizarPersonal') }>
                Actualizar Personal
            </MenuItem>
        </Menu>
    </>
    )
}
