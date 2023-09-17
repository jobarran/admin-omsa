import { Avatar, Card, CardHeader, Divider, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import React, { useEffect, useState } from 'react';

export const MOBILE_COLUMNS = {
  id: true,
  name: true,
  obra: true,
  category: false,
  asistencia: false,
  valoracion: false,
  antiguedad: false,
  actions: true
};
export const ALL_COLUMNS = {
  id: true,
  name: true,
  obra: true,
  category: true,
  asistencia: true,
  valoracion: true,
  antiguedad: true,
  actions: true
};

export const ObraPersonalTableLoading = () => {

  const initialRows: GridRowsProp  = [...Array(7)].map((i) => ({

    id: {i},
    name: '',
    obra: '',
    category: '',
    asistencia: '',
    valoracion: '',
    antiguedad: '',
    actions: ''
  }
  ))

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

    const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS);

    useEffect(() => {
        const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
        setColumnVisible(newColumns);
    }, [matches]);

  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
 

  const columns: GridColDef[] = [
      {
        field: 'id',
        headerName: 'Legajo',
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
        renderCell: () => {
          return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
        }
      },
      {
        field: 'name',
        headerName: 'Nombre',
        flex: 1,
        minWidth: 200,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
        field: 'obra',
        headerName: 'Obra',
        flex: 1,
        minWidth: 60,
        maxWidth: 200,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
        field: 'category',
        headerName: 'Categoría',
        flex: 1,
        minWidth: 50,
        maxWidth: 200,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
        field: 'asistencia',
        headerName: 'Asistencia',
        flex: 1,
        minWidth: 50,
        maxWidth: 200,
        renderCell: () => {
          return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
        }
      },
      {
        field: 'valoracion',
        headerName: 'Valoracion',
        flex: 1,
        minWidth: 50,
        maxWidth: 200,
        renderCell: () => {
          return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
        }
      },
      {
        field: 'actions',
        headerName: 'Ver',
        flex: 0.3,
        renderCell: () => {
          return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
        }
      },
    ];

  
  return (

    <Grid item xs={12}>
      <Card sx={{ boxShadow: 0, }}>
        <CardHeader
          avatar={
            <Avatar>
              <PeopleAltOutlinedIcon/>
            </Avatar>
          }
          title='Asistencia'
        />
        <Divider/>
        <DataGrid
          rows={initialRows}
          getRowId={(row: any) =>  generateRandom()}
          columns={columns}
          columnVisibilityModel={columnVisible}
          rowHeight={35}
          hideFooterSelectedRowCount
          hideFooterPagination
          autoHeight={true}
          disableRowSelectionOnClick
          sx={{
            border: 0,
          }}
        />
      </Card>
    </Grid>
  )
}