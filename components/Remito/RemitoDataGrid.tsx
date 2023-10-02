import React, { FC, useState } from 'react'

import {  Avatar, Box, Button, Card, CardHeader, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, useGridApiRef } from '@mui/x-data-grid'

import {  Iremito } from '@/interfaces'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { useRouter } from 'next/router';
import { RemitoAddModal } from './RemitoAddModal';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

interface Props {
  obra: any,
  obraNames: {
    idObra: string,
    name  : string
  }[],
  remito: Iremito | undefined
}

export const RemitoDataGrid:FC<Props> = ({obra, obraNames, remito}) => {

  if (!remito) return <></>

  const initialRows: GridRowsProp  = remito.elementos.map( (elemento: any) => ({
    id: elemento.om + '-' + elemento.code ,
    om: elemento.om,
    code: elemento.code,
    idMod: elemento.idMod || '',
    cantidad: elemento.cantidad,
  }))

  const [rows, setRows] = useState(initialRows);
  const apiRef = useGridApiRef();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [searchBox, setSearchBox] = useState<any[]>([])
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter()


  const columns: GridColDef[] = [
      {
          field: 'om',
          headerName: 'OM',
          editable: false,
          flex: 1,
          minWidth: 160,
          maxWidth: 350,
      },
      {
          field: 'code',
          headerName: 'Código',
          editable: false,
          flex: 1,
          minWidth: 160,
          maxWidth: 350,
      },
      {
        field: 'idMod',
        headerName: 'ID',
        editable: false,
        flex: 1,
        minWidth: 160,
        maxWidth: 350,
      },
      {
          field: 'cantidad',
          headerName: 'Cantidad',
          editable: false,
          flex: 1,
          minWidth: 160,
          maxWidth: 350,
      },
    ];

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
            title={`Remito Nro: ${remito.number}`}
            titleTypographyProps={{variant:'h6' }}
        />

        <RemitoAddModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            obra={obra}
            obraNames={obraNames}
        />
        

        <Divider/>

        <DataGrid
            apiRef={apiRef}
            rows={initialRows}
            columns={columns}
            rowHeight={35}
            hideFooterSelectedRowCount
            hideFooterPagination
            autoHeight={true}
            disableRowSelectionOnClick
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: 'om', sort: 'asc' }],
              },
            }}
            sx={{
              border: 0,
            }}
        />
      </Card>

      <Divider/>


    </Grid>
  )
}