import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState } from 'react';
import { Chip, Divider, Grid, InputAdornment, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { IOm } from '@/interfaces';
import { GridRowsProp } from '@mui/x-data-grid';
import { adminObraApi } from '@/api';
import { omName } from '../../utils/omName';
import { omRevision } from '../../utils/omRevision';
import { OmAddModalTable } from '.';
import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es' // load on demand


const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

interface Props {

    idObra: string,
    setIsMutating: any,
    openRequestModal: {status:boolean, id: string},
    setOpenRequestModal: any
}


export const OmReqModal:FC<Props> = ({idObra, setIsMutating, openRequestModal, setOpenRequestModal}) => {

    const [dayValue, setDayValue] = useState<Dayjs>(dayjs());
    
    
    const handleDayValueChange = (newValue: any) => {
        setDayValue(newValue)
      }
    
    const handleClose = () => {
        setOpenRequestModal({status:false, id:''})
    };

    const handleRequest = async() => {
        try {
            const submitted = await adminObraApi.put(`/om`, {
                name     : openRequestModal.id,
                necesidad: dayValue.format('DD/MM/YYYY').toString(),
                pedido   : dayjs().format('DD/MM/YYYY').toString(),
                status   : 'pedido'
            })  

            if (submitted.statusText === 'OK') {
                setIsMutating(true)
                setTimeout(() => {
                    setIsMutating(false)
                }, 1000);
                setOpenRequestModal({status: false, id: ''})
            }
        } catch (error) {
           console.log(error)
        }
    }

  return (
      
    <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={openRequestModal.status}
        onClose={handleClose}
    >
            <DialogTitle>{`Pedir ${openRequestModal.id}`}</DialogTitle>
            <DialogContent>


                <Grid 
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >                     

                        <LocalizationProvider 
                        dateAdapter={AdapterDayjs}
                        adapterLocale='es'
                        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}  
                        >

                            <Grid item sx={{mt:1}}>
                                <DatePicker
                                label="Fecha"
                                format="DD/MM/YYYY"
                                disablePast
                                slotProps={{
                                    textField: { size: 'small', fullWidth: true },                  
                                }}
                                value={dayValue}
                                onChange={(newValue) => handleDayValueChange(newValue)}
                                />
                            </Grid>

                        </LocalizationProvider>

    
                </Grid>      
            </DialogContent>
            <DialogActions sx={{ mb:1, mr:1 }}>
                <Button color='error' onClick={handleClose}>Cancelar</Button>
                <Button
                    onClick={handleRequest}
                >Pedir</Button>
            </DialogActions>

    </Dialog>

  );
}


