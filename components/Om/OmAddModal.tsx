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

    const columns: GridColDef[] = [
        { 
            field: 'code',
            headerName: 'Código',
            editable: false,
            flex: 1,
            minWidth: 120,
            maxWidth: 150,
        },
        {
            field: 'quantity',
            headerName: 'Cantidad',
            editable: false,
            flex: 1,
            minWidth: 50,
            maxWidth: 70,
        },
        {
            field: 'description',
            headerName: 'Descripcion',
            flex: 1,
            minWidth: 200,
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Eliminar',
            type: 'actions',
            flex: 1,
            minWidth: 50,
            maxWidth: 100,
            editable: false,
            getActions: (params: any) => [
                <GridActionsCellItem
                  key={params.id}
                  icon={
                    <Tooltip title="Eliminar" arrow>
                      <DeleteOutlineIcon sx={{ color:'error' }} />
                    </Tooltip>
                  }
                  label="Eliminar"
                  onClick={handleDeleteElement(params.id)}
                />,
            ],
        },
      ];
    
    const onSubmit: SubmitHandler<IOm> = async(data) => {

        try {
            setShowError(false)
            const submitted = await adminObraApi.post(`/om`, {
                ...data,
                idObra     : idObra,
                name       : 'OM-'+ idObra + data.name,
                revision   : data.revision,
                floor      : data.floor,
                sector     : data.sector,
                description: data.description,
                status     : '-',
                elements: elementRows

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
        }

    }
    
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleAddElement = () => {

        const codeExists = elementRows.some(item => item.code === code)

        if (!codeExists) {
            setElementRows([
                ...elementRows,
                {code: code, quantity: quantity, description: description, received: 0}
            ])
            setCode('')
            setQuantity('')
            setDescription('')
            setCodeError(false)
          } else {
            setCodeError(true)
          }
    }

    const handleDeleteElement = (id: GridRowId) => () => {
        setElementRows(elementRows.filter(item => item.code !== id))
    }

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
                            label="Ya existe un usuario con ese legajo"
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ display: showError ? 'flex': 'none' }}
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
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
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
                                { ...register('revision', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
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
                                    required: 'Este campo es requerido',
                                    
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
                                    required: 'Este campo es requerido',
                                    
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
                                { ...register('description') }
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={12} sx={{ mb:2}}>
                        <Divider>Elementos</Divider>
                    </Grid>

                    <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>
                        <Grid item xs={3} sx={{ mb:2}}>
                            <TextField
                                size='small'
                                label="Código"
                                variant="outlined"
                                fullWidth 
                                value={code}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setCode(event.target.value);
                                }}
                                error={ codeError }
                                helperText={ !codeError ? '' : 'Códdigo repetido' }
                            />
                        </Grid>
                        <Grid item xs={2} sx={{ mb:2}}>
                            <TextField
                                size='small'
                                label="Cantidad"
                                variant="outlined"
                                fullWidth
                                value={quantity}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setQuantity(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ mb:2}}>
                            <TextField
                                size='small'
                                label="Descripción"
                                variant="outlined"
                                fullWidth 
                                value={description}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} sx={{ mb:2}}>
                            <IconButton
                                onClick={handleAddElement}
                            >
                                <AddCircleOutlinedIcon color='primary'/>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ mb:2}}>
                        <DataGrid
                            rows={elementRows}
                            columns={columns}
                            rowHeight={35}
                            getRowId={(row) => row.code}
                            // columnVisibilityModel={columnVisible}
                            hideFooterSelectedRowCount
                            hideFooterPagination
                            autoHeight={true}
                            disableRowSelectionOnClick
                            sx={{
                            border: 0,
                            }}
                        />
                    </Grid>


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


