import React, { FC, useEffect, useState } from 'react'

import { Avatar, Card, CardHeader, Divider, Grid, useMediaQuery, useTheme, Skeleton } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';

const MOBILE_COLUMNS = {
  id         : true,
  revision   : false,
  floor      : false,
  sector     : false,
  description: true,
  status     : true,
  element    : true
};
const ALL_COLUMNS = {
  id         : true,
  revision   : true,
  floor      : true,
  sector     : true,
  description: true,
  status     : true,
  element    : true
};

export const OmDataGridLoading = () => {

  const initialRows: GridRowsProp  = [...Array(7)].map((i) => ({

    id         : {i},
    revision   : '',
    floor      : '',
    sector     : '',
    description: '',
    status     : '',
  }))

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
          headerName: 'Nombre',
          editable: false,
          flex: 1,
          minWidth: 100,
          maxWidth: 150,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
          field: 'revision',
          headerName: 'Revision',
          editable: false,
          flex: 1,
          minWidth: 50,
          maxWidth: 70,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
          field: 'description',
          headerName: 'Descripcion',
          flex: 1,
          minWidth: 150,
          editable: false,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
          field: 'floor',
          headerName: 'Piso',
          flex: 1,
          minWidth: 40,
          maxWidth: 100,
          editable: false,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
          field: 'sector',
          headerName: 'Sector',
          flex: 1,
          minWidth: 60,
          maxWidth: 200,
          editable: false,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
      {
          field: 'status',
          headerName: 'Estado',
          flex: 1,
          minWidth: 20,
          maxWidth: matches ? 80 : 60,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }   
      },
      {
          field: 'actions',
          headerName: 'Acciones',
          flex: 1,
          minWidth: matches ? 220 : 50,
          maxWidth: 220,
          editable: false,
          renderCell: () => {
            return <Skeleton variant="rounded" width='100%' height={10} sx={{  bgcolor: 'grey.100' }}/>;
          }
      },
    ];
  
  return (

    <Grid item xs={12}>
      <Card sx={{ boxShadow: 0 }}>

        <CardHeader
            avatar={
              <Avatar>
                <ContentPasteOutlinedIcon/>
              </Avatar>
            }
            title='Orden de Montaje'
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

      <Divider/>


    </Grid>
  )
}

