import React, { FC, useEffect, useState } from 'react'

import {  Avatar, Box, Button, Card, CardHeader, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, useGridApiRef } from '@mui/x-data-grid'

import {  Iremito } from '@/interfaces'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { useRouter } from 'next/router';
import { RemitoAddModal } from './RemitoAddModal';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { randomId } from '../../utils/randomId';
import { QuickSearch } from '../DataGrid';

interface Props {
  obra: any,
  obraNames: {
    idObra: string,
    name  : string
  }[],
  setIsMutating: any,
  remitoSelected:Iremito,
  remitoCodeChange: any

}

export const RemitoDataGrid:FC<Props> = ({obra, obraNames, setIsMutating, remitoSelected, remitoCodeChange}) => {

  const rows: GridRowsProp  = remitoSelected.elementos.map( (elemento: any) => ({
    id: elemento.om + '-' + elemento.code ,
    om: elemento.om,
    code: elemento.code,
    idMod: elemento.idMod || '',
    cantidad: elemento.cantidad,
    randomID: randomId()
  }))

  const apiRef = useGridApiRef();

  const [openModal, setOpenModal] = useState(false);
  const [searchBox, setSearchBox] = useState<any[]>([])
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchBox)
  }, [searchBox])

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

    const handleSearchInputChange = (input:any) => {
      setSearchBox(input)
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

              <QuickSearch
                data={ searchBox }
                handleSearchInputChange={ handleSearchInputChange }
                handleDataReset={ setSearchBox }
              />

              <Button
                    sx={{mt:0.5, ml:0.5, display:{xs:'none', md:'flex'}}}
                    variant="outlined"
                    onClick={()=>remitoCodeChange('all')}
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
            title={remitoSelected.number ? `Remito Nro: ${ remitoSelected.number}` : 'Todos los remitos'}
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

        <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            getRowId={(row) => row.om+row.code+row.id+row.randomID}
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