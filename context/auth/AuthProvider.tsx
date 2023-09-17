import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { adminObraApi } from '@/api';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser | undefined
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<PropsWithChildren> = ({ children }:any) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
    const router = useRouter()

    const { data, status } = useSession();

    useEffect(() => {
      if ( status === 'authenticated' ) {
        dispatch({ type: '[Auth] - Login', payload: data?.user as IUser})
      }
    
    }, [ status, data ])
    

    // useEffect(() => {
    //     checkToken()
    // }, [])

    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }

        try {
            const { data } = await adminObraApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user })
        } catch (error) {
            Cookies.remove('token')
        }

    }
    

    const loginUser = async ( email:string, password:string ): Promise<boolean> => {
        
        try {
            const { data } = await adminObraApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user })
            return true
        } catch (error) {
            return false;
        }

    }

    const registerUser = async ( name:string, lastName: string, email:string, password:string ): Promise<{hasError: boolean; message?: string}> => {

        try {
            const { data } = await adminObraApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user })
            return {
                hasError: false,
            }
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario'
            }
        }

    }

    const logout = () => {

        Cookies.set('CallbackUrl', 'asd')

        signOut();

        // Cookies.remove('token');
        // router.reload();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}