import React, { FC, useContext, useEffect, useState } from 'react'

import { Alert, Avatar, Box, Button, Card, CardHeader, Divider, Grid, Snackbar, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowsProp, GridValidRowModel, useGridApiRef } from '@mui/x-data-grid'

import { UiContext } from '@/context'
import { horarios, tareas } from '@/config'
import { Asistencia } from '@/interfaces'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { QuickSearch } from '../DataGrid';
import { DotMenu } from '../DataGrid';
import { useRouter } from 'next/router';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import CallReceivedOutlinedIcon from '@mui/icons-material/CallReceivedOutlined';
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Props {
  data: any
}

export const OmDataGrid:FC<Props> = ({data}) => {

  const initialRows: GridRowsProp  = data.map( (om: any) => ({
    id         : om,
    revision   : 2,
    floor      : 2,
    sector     : '',
    description: '',
    status     : '',
    element    : []
  }))

  const [rows, setRows] = useState(initialRows);
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [searchBox, setSearchBox] = useState<any[]>([])
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter()
    

  useEffect(() => {
    setRows(initialRows)
  }, [data]) 

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchBox)
  }, [searchBox])

  const handleSearchInputChange = (input:any) => {
    setSearchBox(input)
  }

  const columns: GridColDef[] = [
      { 
          field: 'id',
          headerName: 'Nombre',
          editable: false,
          flex: 1,
          minWidth: 80,
          maxWidth: 150,
      },
      {
          field: 'revision',
          headerName: 'Revision',
          editable: false,
          flex: 1,
          minWidth: 50,
          maxWidth: 50,
      },
      {
          field: 'description',
          headerName: 'Descripcion',
          flex: 1,
          minWidth: 150,
          maxWidth: 500,
          editable: true,
      },
      {
          field: 'floor',
          headerName: 'Piso',
          flex: 1,
          minWidth: 60,
          maxWidth: 200,
          editable: false,
      },
      {
          field: 'sector',
          headerName: 'Sector',
          flex: 1,
          minWidth: 60,
          maxWidth: 200,
          editable: false,
      },
      {
          field: 'status',
          headerName: 'Estado',
          flex: 1,
          minWidth: 60,
          maxWidth: 100,
          editable: true,
          type: 'singleSelect',
          valueOptions: ['Presente', 'Ausente', 'ART', 'Vacaciones'],
      },
      {
          field: 'actions',
          headerName: 'Acciones',
          type: 'actions',
          flex: 1,
          minWidth: 200,
          maxWidth: 300,
          editable: false,
          getActions: (params: any) => [
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Elementos" arrow>
                    <ContentPasteOutlinedIcon sx={{ color:theme.palette.primary.main }} />
                  </Tooltip>
                }
                label="Elementos"
                onClick={() => {} }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Ingeniería" arrow>
                    <FolderOutlinedIcon sx={{ color:theme.palette.primary.main }} />
                  </Tooltip>
                }
                label="Ingeniería"
                onClick={() => {} }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Pedir" arrow>
                    <CallMadeOutlinedIcon sx={{ color:theme.palette.primary.main }} />
                  </Tooltip>
                }
                label="Pedir"
                onClick={() => {} }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Recibir" arrow>
                    <CallReceivedOutlinedIcon sx={{ color:theme.palette.primary.main }} />
                  </Tooltip>
                }
                label="Recibir"
                onClick={() => {} }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Editar" arrow>
                    <EditOutlinedIcon sx={{ color:theme.palette.primary.main }} />
                  </Tooltip>
                }
                label="Editar"
                onClick={() => {} }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Eliminar" arrow>
                    <DeleteOutlineIcon sx={{ color:theme.palette.error.main }} />
                  </Tooltip>
                }
                label="Eliminar"
                onClick={() => {} }
              />,
          ],
      },
    ];
  
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
                
                <QuickSearch
                  data={ searchBox }
                  handleSearchInputChange={ handleSearchInputChange }
                  handleDataReset={ setSearchBox }
                />            
 
                <Button 
                  sx={{mt:0.5, ml:0.5, display:{xs:'none', md:'flex'}}}
                  onClick={()=>{}}
                >
                  Guardar
                </Button>
              </Box>
            }
            title='Orden de Montaje'
        />
      

        <Divider/>

        <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            // rowHeight={35}
            hideFooterSelectedRowCount
            hideFooterPagination
            autoHeight={true}
            disableRowSelectionOnClick
            slotProps={{
              toolbar: {
                showQuickFilter: true,
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