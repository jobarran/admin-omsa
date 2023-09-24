import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface Props {
    openDeleteConfirmationDialog: {status:boolean, id: string},
    setOpenDeleteConfirmationDialog: any,
    handleDeleteOm: () => void
}

export const OmDeleteConfirmationDialog:FC<Props> = ({handleDeleteOm, openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog}) => {

  
    const handleClose = () => {
        setOpenDeleteConfirmationDialog({status: false, id: ''});
    };
  
    return (

        <Dialog
          open={openDeleteConfirmationDialog.status}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle color={'error'} id="alert-dialog-title">
            <Stack direction="row" alignItems="center" gap={1}>
                <WarningAmberIcon />
                <Typography variant='h6'>¿Seguro que desea eliminar la OM?</Typography>
            </Stack>

          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Una vez que hayas hecho esto no podrás volver atrás.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button color='error' onClick={handleDeleteOm} autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
    );

}
