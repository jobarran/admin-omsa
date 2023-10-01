import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState } from 'react';
import { Chip, Divider, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { IOm } from '@/interfaces';
import { GridRowsProp, GridValidRowModel } from '@mui/x-data-grid';
import { adminObraApi } from '@/api';
import { omName } from '../../utils/omName';
import { omRevision } from '../../utils/omRevision';
import dayjs, { Dayjs } from 'dayjs';
import { RemitoAddModalTable } from './RemitoAddModalTable';
import { Iremito } from '../../interfaces/remito';
import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es' // load on demand
import { element } from '../../interfaces/om';


const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

interface Props {
    openModal: boolean,
    setOpenModal: any,
    obra: any,
    obraNames: {
        idObra: string,
        name  : string
      }[],
}


export const RemitoAddModal:FC<Props> = ({ openModal, setOpenModal, obra, obraNames}) => {
    

    

    const [elementRows, setElementRows] = useState<readonly GridValidRowModel[]>([]);
    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<Iremito>()
    const [ showError, setShowError ] = useState(false);
    const [ obraSelect, setObraSelect ] = useState(obra.idObra);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [remitoNro, setRemitoNro] = useState('')
    const [observaciones, setObservaciones] = useState('')
    
    const onSubmit = async() => {

        console.log(elementRows)

        try {
            setShowError(false)
            const submitted = await adminObraApi.post(`/remito`, {
                number       : remitoNro,
                obra         : obraSelect,
                date         : date,
                observaciones: observaciones,
                elementos    : elementRows

            })

            if (submitted.statusText === 'Created') {
                setOpenModal(false)
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
        setElementRows([])
    };

    const handleChange = (event: SelectChangeEvent) => {
        setObraSelect(event.target.value);
      };

    

  return (
      
    <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={openModal}
        onClose={handleClose}
    >
            <DialogTitle>Nuevo Remito</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Chip 
                            label="Ya tenemos un remito registrada con ese número"
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ display: showError ? 'flex': 'none', mb:2 }}
                        />
                    </Grid>

                    <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>

                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel >Obra</InputLabel>
                                <Select
                                    size='small'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Obra"
                                    value={obraSelect}
                                    onChange={handleChange}
                                >
                                    {
                                        obraNames.map( (obra:any) => 
                                            <MenuItem key={obra.idObra} value={obra.idObra}>{obra.name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <LocalizationProvider 
                                dateAdapter={AdapterDayjs}
                                adapterLocale='es'
                                localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}  
                                >

                                <Grid item sx={{ mt:{sm:3.5, lg:0}, mb:{sm:3.5, lg:0} }}>
                                    <DatePicker
                                        label="Fecha"
                                        format="DD/MM/YYYY"
                                        disableFuture
                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
                                        slotProps={{
                                            textField: { size: 'small', fullWidth: true },                  
                                        }}
                                    />
                                </Grid>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                type='number'
                                size='small'
                                label="Remito nro"
                                variant="outlined"
                                fullWidth 
                                value={remitoNro}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setRemitoNro(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size='small'
                                label="Observaciones"
                                multiline
                                variant="outlined"
                                fullWidth 
                                value={observaciones}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setObservaciones(event.target.value);
                                }}
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={12} sx={{ mb:2}}>
                        <Divider>Elementos</Divider>
                    </Grid>
                        <RemitoAddModalTable
                            elementRows={elementRows}
                            setElementRows={setElementRows}
                            obra={obra}
                        />
                    </Grid>
                        
            </DialogContent>
            <DialogActions sx={{ mb:1, mr:1 }}>
                <Button color='error' onClick={handleClose}>Cancelar</Button>
                <Button onClick={onSubmit} >Aceptar</Button>
            </DialogActions>
    </Dialog>

  );
}


