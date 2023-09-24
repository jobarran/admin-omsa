import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState } from 'react';
import { Chip, Divider, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { IOm } from '@/interfaces';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { adminObraApi } from '@/api';
import { omName } from '../../utils/omName';
import { omRevision } from '../../utils/omRevision';
import { OmAddModalTable } from '.';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

interface Props {
    openModal: boolean,
    setOpenModal: any,
    idObra: string,
    setIsMutating: any
}


export const OmAddModal:FC<Props> = ({ openModal, setOpenModal, idObra, setIsMutating}) => {

    const data: any = []

    const initialRows: GridRowsProp  = data.map( (om: any) => ({
        code       : om.code || '',
        quantity   : om.quantity || null,
        description: om.description || ''
    }))

    const [elementRows, setElementRows] = useState(initialRows);
    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<IOm>()
    const [ showError, setShowError ] = useState(false);
    const [code, setCode] = useState('')
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [codeError, setCodeError] = useState(false)

    
    
    const onSubmit: SubmitHandler<IOm> = async(data) => {

        try {
            setShowError(false)
            const submitted = await adminObraApi.post(`/om`, {
                ...data,
                idObra     : idObra,
                name       : 'OM-'+ idObra + '-' + omName(data.name),
                revision   : omRevision(data.revision),
                floor      : data.floor,
                sector     : data.sector,
                description: data.description,
                status     : '-',
                element    : elementRows

            })

            if (submitted.statusText === 'Created') {
                setIsMutating(true)
                setTimeout(() => {
                    setIsMutating(false)
                }, 1000);
                setOpenModal(false)
                reset()
                setElementRows([])
            }
        } catch (error) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
        }

    }
    
    const handleClose = () => {
        setOpenModal(false);
        reset()
        setElementRows([])
        setCode('')
        setQuantity('')
        setDescription('')
    };

    

  return (
      
    <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={openModal}
        onClose={handleClose}
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Nueva Orden de Montaje</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Chip 
                            label="Ya tenemos una OM registrada con ese nombre"
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ display: showError ? 'flex': 'none', mb:2 }}
                        />
                    </Grid>

                    <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                size='small'
                                label="Nombre"
                                variant="outlined"
                                fullWidth 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{`OM-${idObra}-`}</InputAdornment>
                                  }}
                                { ...register('name', {
                                    required: 'Debe indicar el nombre',
                                    maxLength: 3
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                size='small'
                                label="Revision"
                                variant="outlined"
                                fullWidth 
                                inputProps={{ maxLength: 2 }}
                                { ...register('revision', {
                                    required: 'Debe indicar la revisión',
                                })}
                                error={ !!errors.revision }
                                helperText={ errors.revision?.message }
                            />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <TextField
                                size='small'
                                label="Piso"
                                variant="outlined"
                                fullWidth 
                                { ...register('floor', {
                                    required: 'Debe indicar el Piso',
                                    
                                })}
                                error={ !!errors.floor }
                                helperText={ errors.floor?.message }
                            />
                        </Grid>
                        <Grid item xs={6} sm={5}>
                            <TextField
                                size='small'
                                label="Sector"
                                variant="outlined"
                                fullWidth 
                                { ...register('sector', {
                                    required: 'Debe indicar el sector',
                                    
                                })}
                                error={ !!errors.sector }
                                helperText={ errors.sector?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size='small'
                                label="Descripción"
                                multiline
                                variant="outlined"
                                fullWidth 
                                { ...register('description', {
                                    required: 'Debe indicar la descripción',
                                    
                                })}
                                error={ !!errors.description }
                                helperText={ errors.description?.message }
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={12} sx={{ mb:2}}>
                        <Divider>Elementos</Divider>
                    </Grid>

                    <OmAddModalTable
                        elementRows={elementRows}
                        setElementRows={setElementRows}
                        code={code}
                        setCode={setCode}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        description={description}
                        setDescription={setDescription}
                        codeError={codeError}
                        setCodeError={setCodeError}
                    />

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


