import { IObra } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
     isMenuOpen: boolean;
     activeObra: IObra | undefined

     //Metods
     toggleSideMenu: () => void;
}

export const UiContext = createContext( {} as ContextProps );