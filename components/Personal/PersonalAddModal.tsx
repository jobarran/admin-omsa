import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { Autocomplete, Chip, Divider, FormHelperText, Grid, IconButton, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { aptitudes, categorias } from '@/config';
import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es' // load on demand
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { adminObraApi } from '@/api';
import { useSWRConfig } from 'swr';


const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

interface Props {
    openModal: boolean,
    setOpenModal: any,
    setIsMutating: any,
    obraNames: {
        idObra: string,
        name  : string
      }[],
}

interface Inputs {
    name       : string
    lastName   : string
    legajo     : string
    estado     : string
    obra       : string
    telefono   : string
    direccion  : string
    nacimiento : string
    categoria  : string
    alta       : string
    descripcion: string
    tags       :string[]
}

export const PersonalAddModal:FC<Props> = ({ openModal, setOpenModal, obraNames, setIsMutating}) => {

    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<Inputs>()
    const [ showError, setShowError ] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [aptitud, setAptitud] = useState('');
    
    const onSubmit: SubmitHandler<Inputs> = async(data) => {

        try {
            setShowError(false)
            const submitted = await adminObraApi.post(`/personal`, {
                ...data,
                tags: tags,
                alta: dateToString(data.alta),
                nacimiento: data.nacimiento ? dateToString(data.nacimiento) : ''
            })
            if (submitted.statusText === 'Created') {
                setIsMutating(true)
                setTimeout(() => {
                    setIsMutating(false)
                }, 1000);
                setOpenModal(false)
                reset()
                setTags([])
            }
        } catch (error) {
            setShowError(true)
        }
    }

    const handleDeleteTag = (chipToDelete: string) => () => {
        setTags((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const handleAddTag = (chipToAdd: string) => () => {
        setAptitud('')
        if (chipToAdd.length !== 0 && !tags.includes(chipToAdd) )
        setTags([...tags, chipToAdd]);
    };
    
    const handleClose = () => {
        setOpenModal(false);
    };

    const dateToString = (date: any) => {
        return date.format('DD/MM/YYYY')
    }


  return (
      
    <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={openModal}
        onClose={handleClose}
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Agregar nuevo</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Chip 
                                label="Ya existe un usuario con ese legajo"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb:2}}>
                            <Divider>Información de Personal</Divider>
                        </Grid>

                        <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    size='small'
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('name', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                    })}
                                    error={ !!errors.name }
                                    helperText={ errors.name?.message }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    size='small'
                                    label="Apellido"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('lastName', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                    })}
                                    error={ !!errors.lastName }
                                    helperText={ errors.lastName?.message }
                                />
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <TextField
                                    size='small'
                                    label="Legajo"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('legajo', {
                                        required: 'Este campo es requerido',
                                        
                                    })}
                                    error={ !!errors.legajo }
                                    helperText={ errors.legajo?.message }
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <LocalizationProvider 
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale='es'
                                    localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}  
                                >
                                    <Controller
                                        control={control}
                                        name='alta'
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Alta"
                                                format="DD/MM/YYYY"
                                                slotProps={{
                                                    textField: { size: 'small', fullWidth: true },                  
                                                }}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                    <Select
                                        size='medium'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Categoría"
                                        defaultValue=""
                                        { ...register('categoria', {
                                            required: 'Este campo es requerido',
                                        })}
                                        error={ !!errors.categoria }
                                    >
                                        {
                                            categorias.map((categoria: string) => 
                                                <MenuItem key={categoria} value={categoria}>{categoria}</MenuItem>
                                            )
                                        }
                                    </Select>
                                    <FormHelperText error>{ errors.categoria ? errors.categoria?.message : '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Obra</InputLabel>
                                    <Select
                                        size='medium'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Obra"
                                        defaultValue=""
                                        { ...register('obra', {
                                            required: 'Este campo es requerido',
                                        })}
                                        error={ !!errors.obra }
                                    >
                                        {
                                            obraNames.map( (obra:any) => 
                                                <MenuItem key={obra.idObra} value={obra.idObra}>{obra.name}</MenuItem>
                                            )
                                        }
                                    </Select>
                                    <FormHelperText error>{ errors.obra ? errors.obra?.message : '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                    <Select
                                        size='medium'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Estado"
                                        defaultValue="activo"
                                        { ...register('estado', {
                                            required: 'Este campo es requerido',
                                            
                                        })}
                                        error={ !!errors.estado }
                                    >
                                        <MenuItem value='activo'>Activo</MenuItem>
                                        <MenuItem value='inactivo'>Inactivo</MenuItem>
                                    </Select>
                                    <FormHelperText error>{ errors.estado ? errors.estado?.message : '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ mb:2}}>
                            <Divider>Datos personales</Divider>
                        </Grid>

                        <Grid container sx={{ padding:'5px 0px 5px 15px' }} spacing={2}>

                                <Grid item xs={12} sm={4}>
                                <LocalizationProvider 
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale='es'
                                    localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}  
                                >
                                    <Controller
                                        control={control}
                                        name='nacimiento'
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Fecha de Nacimiento"
                                                format="DD/MM/YYYY"
                                                slotProps={{
                                                    textField: { size: 'small', fullWidth: true },                  
                                                }}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        size='small'
                                        label="Telefono"
                                        variant="outlined"
                                        fullWidth 
                                        { ...register('telefono') }
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        size='small'
                                        label="Dirección"
                                        variant="outlined"
                                        fullWidth 
                                        { ...register('direccion') }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        label="Descripción"
                                        multiline
                                        variant="outlined"
                                        fullWidth 
                                        rows={2}
                                        { ...register('descripcion') }
                                    />
                                </Grid>


                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ m:2}}>
                            <Divider>Aptitudes</Divider>
                        </Grid>

                        <Grid  container sx={{ padding:'5px 0px 5px 15px' }} spacing={2}>


                            <Grid item  xs={10} sm={11}>

                            <Autocomplete
                                disablePortal
                                id="aptitudes"
                                options={aptitudes}
                                value={ aptitud }
                                onChange={(event: any, newValue: SetStateAction<string> | null) => {
                                    setAptitud(newValue!);
                                }}
                                renderInput={(params) => <TextField {...params} label="Aptitud" />}
                                size='small'
                            />
                            </Grid>
                            <Grid item  xs={1}>
                                <IconButton
                                    onClick={handleAddTag(aptitud)}
                                >
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>

                            <Paper
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    mt:1,
                                    mb: 0
                                }}
                                component="ul"
                                >
                                    
                                    {tags.map((data) => {
                                        let icon
                                        return (
                                            <ListItem key={data}>
                                                <Chip
                                                icon={icon}
                                                label={data}
                                                onDelete={handleDeleteTag(data)}
                                                />
                                            </ListItem>
                                        );
                                    })}       

                            </Paper>

                        </Grid>
                            


                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" >Subscribe</Button>
            </DialogActions>
        </form>
    </Dialog>

  );
}


