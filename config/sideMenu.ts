import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

interface Props {
    name: string,
    avatar: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    url: string,
}

export const sideMenu: Props[] = [
    {
        name: "Personal",
        avatar: PersonOutlineOutlinedIcon,
        url: "/personal",
    },
    {
        name: "Equipos",
        avatar: BuildOutlinedIcon,
        url: "/equipos",
    },
]

export const sideMenuObra: Props[] = [
    {
        name: "Avance",
        avatar: EqualizerOutlinedIcon,
        url: "/avance",
    },
    {
        name: "OM",
        avatar: ContentPasteOutlinedIcon,
        url: "/om",
    },
    {
        name: "Personal",
        avatar: PersonOutlineOutlinedIcon,
        url: "/personal",
    },
    {
        name: "Equipos",
        avatar: BuildOutlinedIcon,
        url: "/equipos",
    },
    {
        name: "Ingeniería",
        avatar: FolderOutlinedIcon,
        url: "/ingenieria",
    },
    {
        name: "Fotos",
        avatar: ImageOutlinedIcon,
        url: "/fotos",
    },
]

export const sideMenuObraCarga: Props[] = [
    {
        name: "Cargar Montaje",
        avatar: AddCircleOutlineOutlinedIcon,
        url: "/montaje",
    },
    {
        name: "Cargar Asistencia",
        avatar: AddCircleOutlineOutlinedIcon,
        url: "/asistencia",
    },
]