import { FC, useEffect, useReducer } from 'react';
import { UiContext, uiReducer } from './';
import { IObra } from '@/interfaces';
import { useRouter } from 'next/router';
import { useObras } from '@/hooks';


export interface UiState {
    isMenuOpen: boolean;
    activeObra: IObra | undefined
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
    activeObra: undefined
}

interface Props {
    children?: any
}


export const UiProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
    const { obras } = useObras('/obras')
    const router = useRouter()

    useEffect(() => {
        const data = sessionStorage.getItem('activeObra');
        if ( data !== null && data !== undefined ) {
            dispatch({ type: '[UI] - Update Active Obra', payload: JSON.parse(data)  })
        }
      }, []);
       
    useEffect(() => {
        if ( Object.keys(router.query).length !== 0 ) {
            if ( router.query.idObra ) {
                try {
                    const activeObra = obras.find(obra => obra.idObra === router.query.idObra)
                    if (activeObra) {
                        sessionStorage.setItem('activeObra', JSON.stringify(activeObra))
                        dispatch({ type: '[UI] - Update Active Obra', payload: activeObra  })
                    } 
                } catch (error) {
                    sessionStorage.removeItem('activeObra')
                    dispatch({ type: '[UI] - Update Active Obra', payload: undefined  })
                }
            }
        } else {
            sessionStorage.removeItem('activeObra')
            dispatch({ type: '[UI] - Update Active Obra', payload: undefined  })
        }
    }, [router.asPath]) 

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleName' })
    }

    // const setActiveObra = ( obra: IObra ) => {

    //     dispatch({ type: '[UI] - Update Active Obra', payload: obra })
    // }

    return (
        <UiContext.Provider value={{
            ...state,

            //Metodos
            toggleSideMenu
        }}>
            { children }
        </UiContext.Provider>
    )
}