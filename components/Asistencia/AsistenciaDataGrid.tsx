import React, { FC, useContext, useEffect, useState } from 'react'

import { Alert, Avatar, Box, Button, Card, CardHeader, Divider, Grid, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridValidRowModel, useGridApiRef } from '@mui/x-data-grid'

import { UiContext } from '@/context'
import { horarios, tareas } from '@/config'
import { Asistencia } from '@/interfaces'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { QuickSearch } from '../DataGrid';
import { DotMenu } from '../DataGrid';
import { AsistenciaDataGridLoading } from '.';

interface Props {
  data: any
  onUpdateRow: any,
  obraNames: any,
  onUpdatePersonal: any,
  setIsMutating: any,
  isMutating: boolean
}

const MOBILE_COLUMNS = {
  id: false,
  name: true,
  obra: true,
  estado: true,
  ingreso: true,
  salida: true,
  tarea: true,
};
const ALL_COLUMNS = {
  id: true,
  name: true,
  obra: true,
  estado: true,
  ingreso: true,
  salida: true,
  tarea: true,
};

export const AsistenciaDataGrid:FC<Props> = ({data, onUpdateRow, obraNames, onUpdatePersonal, setIsMutating, isMutating}) => {

  console.log(data)

  const initialRows: GridRowsProp  = data.asistenciaData.map( (personal: Asistencia) => ({
    id: personal.legajo,
    name: personal.lastName + ' ' + personal.name,
    obra: personal.obra,
    ingreso: personal.ingreso,
    salida: personal.salida,
    tarea: personal.tarea,
    estado: personal.estado
  }))

  const [rows, setRows] = useState(initialRows);
  const { activeObra } = useContext( UiContext ) 
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [searchBox, setSearchBox] = useState<any[]>([])
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [columnVisible, setColumnVisible] = React.useState(ALL_COLUMNS);
  
  useEffect(() => {
      const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
      setColumnVisible(newColumns);
  }, [matches]);

  useEffect(() => {
    setRows(initialRows)
  }, [data])
  

  useEffect(() => {
    setRows(initialRows)
  }, [isMutating===true])
  

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchBox)
  }, [searchBox])

  const replaceObjectsById = (sourceArray: readonly GridValidRowModel[], replacementArray: readonly GridValidRowModel[]) => {
    const replacementMap = new Map(replacementArray.map((obj: GridValidRowModel) => [obj.id, obj]));
    const updatedArray = sourceArray.map((obj: GridValidRowModel) => {
      const replacementObject = replacementMap.get(obj.id);
      return replacementObject ? replacementObject : obj;
    });
    return updatedArray;
  }

  const autoFill = (objectsArray: any) => {
    const replacementMap = new Map(objectsArray.map((obj: GridValidRowModel) => [obj.id, obj]));
    const updatedArray = rows.map((obj: GridValidRowModel) => {
      const replacementObject = replacementMap.get(obj.id);
        if (replacementObject) {
        return {
          ...replacementObject,
          estado: 'Presente',
          ingreso: '07:00',
          salida: '16:00',
        };
      }
        return obj;
    });
  
    return updatedArray;
  };

  const onSaveData = () => {
    const myMap = apiRef.current.getSelectedRows()
    const array = Array.from(myMap.values());
    setRows(replaceObjectsById(rows, array))
    setSelectedRows(array)
    onUpdateRow(array)
    apiRef.current.setRowSelectionModel([])
    setOpen(true);
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSearchInputChange = (input:any) => {
    setSearchBox(input)
  }

  const handleAutoFill = () => {
    const myMap = apiRef.current.getSelectedRows()
    const array = Array.from(myMap.values());
    array.length !== 0 ? setRows(autoFill(array)) : setOpen(true);
  }

  const handleUpdatePersonal = () => {
    onUpdatePersonal()
    setIsMutating(true)
    setTimeout(() => {
      setIsMutating(false)
    }, 1000);
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Legajo', width: 70 },
      {
          field: 'name',
          headerName: 'Nombre',
          editable: false,
          flex: 1,
          minWidth: 160,
          maxWidth: 350,
      },
      {
          field: 'obra',
          headerName: 'Obra',
          flex: 1,
          minWidth: 60,
          maxWidth: 200,
          editable: true,
          type: 'singleSelect',
          valueOptions: obraNames.map( (obra:any) => obra.idObra)
      },
      {
          field: 'estado',
          headerName: 'Estado',
          flex: 1,
          minWidth: 60,
          maxWidth: 200,
          editable: true,
          type: 'singleSelect',
          valueOptions: ['Presente', 'Ausente', 'ART', 'Vacaciones'],
      },
      {
        field: 'ingreso',
        headerName: 'Ingreso',
        flex: 1,
        minWidth: 60,
        maxWidth: 200,
        editable: true,
        type: 'singleSelect',
        valueOptions: horarios,
      },
      {
        field: 'salida',
          headerName: 'Salida',
          flex: 1,
          minWidth: 60,
          maxWidth: 200,
          editable: true,
          type: 'singleSelect',
          valueOptions: horarios,
        },
      {
        field: 'tarea',
        headerName: 'Tarea',
        flex: 1,
        minWidth: 150,
        maxWidth: 350,
        editable: true,
        type: 'singleSelect',
        valueOptions: tareas,
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
                    variant="outlined"
                    onClick={handleUpdatePersonal}
                >
                    Actualizar personal
                </Button>

                <Button
                  sx={{mt:0.5, ml:0.5, display:{xs:'none', md:'flex'}}}
                  variant="outlined"
                  onClick={handleAutoFill}
                >
                    Autocompletar
                </Button>

                <DotMenu
                  handleAutoFill={ handleAutoFill }
                  handleSaveData={ onSaveData }
                />                
 
                <Button 
                  sx={{mt:0.5, ml:0.5, display:{xs:'none', md:'flex'}}}
                  onClick={onSaveData}
                >
                  Guardar
                </Button>
              </Box>
            }
            title='Asistencia'
        />
        
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            variant="filled" 
            severity={ selectedRows.length === 0 ? 'warning' : 'success' }
            color={ selectedRows.length === 0 ? 'error' : 'info' }
            sx={{ width: '100%'}}
          >
            { selectedRows.length === 0 ? 'Debe seleccionar al menos 1 fila' : 'Cambios Guardados' }
          </Alert>
        </Snackbar>

        <Divider/>

        <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            columnVisibilityModel={columnVisible}
            rowHeight={35}
            hideFooterSelectedRowCount
            hideFooterPagination
            autoHeight={true}
            checkboxSelection 
            disableRowSelectionOnClick
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            initialState={{
              filter: {
                filterModel: {
                  items: [{ field: 'obra', operator: 'is', value: activeObra?.idObra }],
                },
              },
              sorting: {
                sortModel: [{ field: 'name', sort: 'asc' }],
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