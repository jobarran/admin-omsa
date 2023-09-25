import React, { FC, useEffect, useState } from 'react'

import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, Tooltip, useMediaQuery, useTheme, Typography, capitalize, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId, GridRowsProp, useGridApiRef } from '@mui/x-data-grid'

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { QuickSearch } from '../DataGrid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import CallReceivedOutlinedIcon from '@mui/icons-material/CallReceivedOutlined';
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircleIcon from '@mui/icons-material/Circle';
import { capitalizeAndSpaceInit, statusColor } from '@/utils';
import { OmAddModal, OmDeleteConfirmationDialog, OmEditModal, OmReqModal } from '.';
import { adminObraApi } from '@/api';
import { IOm } from '@/interfaces';

interface Props {
  data: any,
  obra: any,
  setIsMutating: any
}

const MOBILE_COLUMNS = {
  id         : true,
  revision   : false,
  floor      : false,
  sector     : false,
  description: false,
  status     : true,
  necesidad  : true,
  element    : true
};
const ALL_COLUMNS = {
  id         : true,
  revision   : true,
  floor      : true,
  sector     : true,
  description: true,
  status     : true,
  necesidad  : true,
  element    : true
};

export const OmDataGrid:FC<Props> = ({data, obra, setIsMutating}) => {

  const initialRows: GridRowsProp  = data.map( (om: any) => ({
    id         : om.name,
    revision   : om.revision,
    floor      : om.floor,
    sector     : om.sector,
    necesidad  : om.necesidad === '-' ? '' : om.necesidad,
    description: om.description,
    status     : om.status,
  }))

  const [rows, setRows] = useState(initialRows);
  const apiRef = useGridApiRef();
  const [searchBox, setSearchBox] = useState<any[]>([])
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState({status: false, id:''})
  const [omData, setOmData] = useState<IOm>()
  const [openOmEditModal, setOpenOmEditModal] = useState(false)
  const [openRequestModal, setOpenRequestModal] = useState({status: false, id:''})

  console.log(rows)

  useEffect(() => {
      const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
      setColumnVisible(newColumns);
  }, [matches]);
    

  useEffect(() => {
    setRows(initialRows)
    setOmData(undefined)
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
          minWidth: 120,
          maxWidth: matches ? 150 : 500
      },
      {
          field: 'revision',
          headerName: 'Revision',
          editable: false,
          flex: 1,
          minWidth: 50,
          maxWidth: 70,
      },
      {
          field: 'description',
          headerName: 'Descripcion',
          flex: 1,
          minWidth: 150,
          editable: false,
      },
      {
          field: 'floor',
          headerName: 'Piso',
          flex: 1,
          minWidth: 40,
          maxWidth: 100,
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
          minWidth: 20,
          maxWidth: matches ? 80 : 60,
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => (
            <>
              <Tooltip title={ params.value === '-' ? '' : params.value} arrow>
                <CircleIcon fontSize='small' color={ statusColor(params.value, params.row.necesidad) } />
              </Tooltip>
            </>


          )      
      },
      {
          field: 'necesidad',
          headerName: 'Necesidad',
          flex: 1,
          minWidth: 100,
          maxWidth: 130,
          editable: false,
          disableColumnMenu: true,
      },
      {
          field: 'actions',
          headerName: 'Acciones',
          type: 'actions',
          flex: 1,
          minWidth: matches ? 220 : 40,
          maxWidth: 220,
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
                showInMenu={ matches ? false : true }
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
                showInMenu={ matches ? false : true }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Pedir" arrow>
                    <CallMadeOutlinedIcon sx={{ color: theme.palette.primary.main }}  />
                  </Tooltip>
                }
                label="Pedir"
                onClick={()=>handleOpenRquestModal(params.id)}
                showInMenu={ matches ? false : true }
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
                showInMenu={ matches ? false : true }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Editar" arrow>
                    <EditOutlinedIcon sx={{ color:theme.palette.primary.main }} />
                  </Tooltip>
                }
                label="Editar"
                onClick={()=>handleOpenEditModal(params.id)}
                showInMenu={ matches ? false : true }
              />,
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="Eliminar" arrow>
                    <DeleteOutlineIcon sx={{ color:theme.palette.error.main }} />
                  </Tooltip>
                }
                label="Eliminar"
                onClick={()=>handleOpenDeleteDialog(params.id)}
                showInMenu={ matches ? false : true }
              />
          ],
      },
    ];

    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleOpenDeleteDialog = (id: string) => {
      setOpenDeleteConfirmationDialog({status: true, id: id})
    }

    const handleOpenEditModal = (id:string) => {
      setOpenOmEditModal(true);
      setOmData(
        data.find((om:any) => om.name === id)
      )
    }

    const handleOpenRquestModal  = (id:string) => {
      setOpenRequestModal({ status: true, id: id });
    }


    const handleDeleteOM = async() => {
      try {
        const submitted = await adminObraApi.delete(`/om`, {
          data: {
            id: openDeleteConfirmationDialog.id
          }
        })
        if (submitted.statusText === 'OK') {
          setOpenDeleteConfirmationDialog({status:false, id:''})
          setIsMutating(true)
          setTimeout(() => {
              setIsMutating(false)
          }, 1000);
        }        
      } catch (error) {
        console.log(error)
      }


    }
  
  return (

    <Grid item xs={12}>
      <Card sx={{ boxShadow: 0 }}>

        <CardHeader
            avatar={
              <Avatar>
                <ContentPasteOutlinedIcon/>
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
                  sx={{mt:0.5, ml:0.5}}
                  onClick={handleOpenModal}
                >
                  Nueva OM
                </Button>
              </Box>
            }
            title='Orden de Montaje'
        />

        <OmDeleteConfirmationDialog
          openDeleteConfirmationDialog={openDeleteConfirmationDialog}
          setOpenDeleteConfirmationDialog={setOpenDeleteConfirmationDialog}
          handleDeleteOm={() => handleDeleteOM()}
        />

        <OmAddModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            setIsMutating={setIsMutating}
            idObra={obra.idObra}
        />

        {
          omData
          ?
          <OmEditModal
            openModal={openOmEditModal}
            setOpenModal={setOpenOmEditModal}
            setIsMutating={setIsMutating}
            idObra={obra.idObra}
            omData={omData}
            setOmData={setOmData}
        />
          : <></>
        }

        <OmReqModal
          idObra={obra.idObra}
          setIsMutating={setIsMutating}
          openRequestModal={openRequestModal}
          setOpenRequestModal={setOpenRequestModal}
        />

        <Divider/>

        <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            // rowHeight={35}
            columnVisibilityModel={columnVisible}
            hideFooterSelectedRowCount
            hideFooterPagination
            autoHeight={true}
            disableRowSelectionOnClick
            localeText={{
              noRowsLabel: "No hay OM cargadas",
              noResultsOverlayLabel: "La búsqueda no arrojó ningun resultado"
            }}
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

