import React, { useState } from 'react'

import {  Avatar, Box, Button, Card, CardHeader, Divider, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, useGridApiRef } from '@mui/x-data-grid'


import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { randomId } from '../../utils/randomId';


export const RemitoDataGridLoading = () => {

  const rows: GridRowsProp  = [...Array(10)].map((i) => ({
    id:{i},
    om:'',
    code: '',
    idMod: '',
    cantidad: '',
  }))

  const [openModal, setOpenModal] = useState(false);
  const [searchBox, setSearchBox] = useState<any[]>([])
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const columns: GridColDef[] = [
      {
          field: 'om',
          headerName: 'OM',
          editable: false,
          flex: 1,
          minWidth: 160,
          maxWidth: 350,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
          field: 'code',
          headerName: 'Código',
          editable: false,
          flex: 1,
          minWidth: 160,
          maxWidth: 350,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
        field: 'idMod',
        headerName: 'ID',
        editable: false,
        flex: 1,
        minWidth: 160,
        maxWidth: 350,
        renderCell: () => {
          return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
        }
      },
      {
        field: 'cantidad',
        headerName: 'Cantidad',
        editable: false,
        flex: 1,
        minWidth: 160,
        maxWidth: 350,
        renderCell: () => {
          return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
        }
      },
    ];

    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleSearchInputChange = (input:any) => {
      setSearchBox(input)
    }
  
  function generateRandom(): import("@mui/x-data-grid").GridRowId {
    throw new Error('Function not implemented.');
  }

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
                    sx={{mt:0.5, ml:0.5, display:{xs:'none', md:'flex'}}}
                    variant="outlined"
                >
                  Ver todos los elementos
                </Button>
               
                <Button 
                  sx={{mt:0.5, ml:0.5 }}
                  onClick={handleOpenModal}
                >
                  Nuevo Remito
                </Button>
              </Box>
            }
            title={<Skeleton variant="rounded" width={250} height={10} sx={{  bgcolor: 'grey.100' }}/>}
        />      

        <Divider/>

        <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row: any) =>  randomId()}
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