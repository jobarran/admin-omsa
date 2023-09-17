import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react';
import { AuthLayout } from "@/components/layouts"
import { Box, Button, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form'
import { validations } from '@/utils';
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';


type FormData = {
  email   : string,
  password: string,
};

export const LoginPage = () => {

    
    const router = useRouter();
    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitted },
        reset,
        setFocus,
        clearErrors
    } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [providers, setProviders] = useState<any>({});
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    useEffect(() => {
      
        getProviders().then( prov => {
            setProviders(prov)
        })
    
    }, [])
    

    const onLoginUser = async ( { email, password }: FormData ) => {
        setShowError(false)
        const url = Cookies.get( 'CallbackUrl' )
        await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        .then(({ ok, error }: any) => {
            if (ok) {
                router.push( url ? url : '/' );
            } else {
                setShowError(true);
                setTimeout(() => {
                    setShowError(false)
                }, 3000);
                setFocus('email')
            }
        })
    }


  return (

    <AuthLayout title={"Login"}>
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate >
            <Box sx={{ width:350, padding:'10px 20px' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Iniciar Sesión</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type='email'
                            label="Correo"
                            fullWidth
                            {...register('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        ></TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }
                            label="Contraseña"
                            fullWidth
                                    { ...register('password', {
                                        required: 'Este campo es requerido',
                                        // minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                    })}
                        />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Chip
                            label='Datos incorrectos. Vuelva a intentar'
                            color='error'
                            icon={ <ErrorOutline/> }
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </ Grid>

                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            color="secondary"
                            className="circular-btn"
                            size="large"
                            fullWidth
                        >Ingresar</Button>
                    </Grid>


                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values( providers ).map(( provider: any ) => {
                                                                    
                                    if ( provider.id === 'credentials' ) return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={ provider.id }
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1 }}
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )

                                })
                            }
                    </Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>

  )
}

// you should only use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
//     const session = await getSession({ req });
    
//     if ( session ) {
        
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }


//     return {
//         props: { }
//     }
// }

export default LoginPage