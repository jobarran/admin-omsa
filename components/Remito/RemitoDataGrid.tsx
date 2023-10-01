import React, { FC, useContext, useEffect, useState } from 'react'

import { Alert, Avatar, Box, Button, Card, CardHeader, Divider, Grid, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridValidRowModel, useGridApiRef } from '@mui/x-data-grid'

import { UiContext } from '@/context'
import { horarios, tareas } from '@/config'
import { Asistencia } from '@/interfaces'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { QuickSearch } from '../DataGrid';
import { DotMenu } from '../DataGrid';
import { useRouter } from 'next/router';
import { RemitoAddModal } from './RemitoAddModal';

const data = [
  {om: '1371-OM-001', codigo: 'A001', cantidad: 10},
  {om: '1371-OM-002', codigo: 'da', cantidad: 10},
  {om: '1371-OM-001', codigo: 'das', idMod: 456, cantidad: 10},
  {om: '1371-OM-001', codigo: 'wtbtr', cantidad: 10},
  {om: '1371-OM-001', codigo: 'bbvd', cantidad: 10},
  {om: '1371-OM-001', codigo: 'mjmuy', idMod: 456, cantidad: 10},
  {om: '1371-OM-001', codigo: 'nyli', cantidad: 10},
  {om: '1371-OM-001', codigo: 'nbtj', cantidad: 10},
  {om: '1371-OM-001', codigo: 'fmuy', cantidad: 10},
  {om: '1371-OM-001', codigo: 'myufb', idMod: 456, cantidad: 10},
  {om: '1371-OM-001', codigo: 'ngig', cantidad: 10},
  {om: '1371-OM-001', codigo: 'nfnty', cantidad: 10},
  {om: '1371-OM-001', codigo: 'bnrnty', idMod: 456, cantidad: 10},
  {om: '1371-OM-001', codigo: 'nftynf', cantidad: 10},
]

interface Props {
  obra: any,
  obraNames: {
    idObra: string,
    name  : string
  }[],
}

export const RemitoDataGrid:FC<Props> = ({obra, obraNames}) => {

  const initialRows: GridRowsProp  = data.map( (elemento: any) => ({
    id: elemento.om + '-' + elemento.codigo ,
    om: elemento.om,
    codigo: elemento.codigo,
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
          field: 'codigo',
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
                <PeopleAltOutlinedIcon/>
              </Avatar>
            }
            action={
              <Box display='flex' >
               
                <Button 
                  sx={{mt:0.5, ml:0.5, display:{xs:'none', md:'flex'}}}
                  onClick={handleOpenModal}
                >
                  Nuevo Remito
                </Button>
              </Box>
            }
            title='Asistencia'
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
            rows={rows}
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