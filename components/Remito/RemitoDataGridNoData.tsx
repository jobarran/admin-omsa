import React, { FC, useState } from 'react'

import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, Skeleton, useTheme, Typography } from '@mui/material';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { RemitoAddModal } from './RemitoAddModal';

interface Props {
  obra: any,
  obraNames: {
    idObra: string,
    name  : string
  }[],
  setIsMutating: any,
}

export const RemitoDataGridNoData:FC<Props> = ({obra, obraNames, setIsMutating}) => {

  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme()


    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
  return (

    <Grid item xs={12}>
      <Card sx={{ boxShadow: 0 }}>

        <CardHeader
            avatar={
              <Avatar>
                <AssignmentOutlinedIcon/>
              </Avatar>
            }
            action={
              <Box display='flex' >
               
                <Button 
                  sx={{mt:0.5, ml:0.5 }}
                  onClick={handleOpenModal}
                >
                  Nuevo Remito
                </Button>
              </Box>
            }
            title={'Remitos'}
            titleTypographyProps={{variant:'h6' }}
        />      

        <RemitoAddModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            obra={obra}
            obraNames={obraNames}
            setIsMutating={setIsMutating}
        />

        <Divider/>

            
        <Box
          minHeight={300}
          p={10}
          >
          <Typography variant='body2' align="center">No hay temitos</Typography>
        </Box>
        


      </Card>

      <Divider/>


    </Grid>
  )
}