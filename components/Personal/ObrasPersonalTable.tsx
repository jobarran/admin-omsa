import { UiContext } from '@/context';
import { IPersonal, IUser } from '@/interfaces';
import { Avatar, Box, Button, Card, CardHeader, Dialog, Divider, Grid, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp, useGridApiRef } from '@mui/x-data-grid';
import * as React from 'react';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useRouter } from 'next/router';
import StepLabel from '@mui/material/StepLabel';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { QuickSearch } from '../DataGrid';
import { PersonalAddModal } from '.';
import dayjs from 'dayjs';
import { getYearsBetweenDates } from '@/utils';

interface Props {
    data: IPersonal[],
    setIsMutating: any
    obraNames: {
        idObra: string,
        name  : string
      }[],
}

const MOBILE_COLUMNS = {
    id: true,
    name: true,
    obra: true,
    category: false,
    asistencia: false,
    valoracion: false,
    antiguedad: false,
    actions: true
  };
  const ALL_COLUMNS = {
    id: true,
    name: true,
    obra: true,
    category: true,
    asistencia: true,
    valoracion: true,
    antiguedad: true,
    actions: true
  };
 
export const ObraPersonalTable:FC<Props> = ({ data, obraNames, setIsMutating }) => {

    const rows: GridRowsProp  = data.map( operario => ({
        key: operario.legajo,
        id: operario.legajo,
        name: operario.lastName + ' ' + operario.name,
        obra: operario.obra,
        category: operario.categoria,
        asistencia: '30%',
        valoracion: '8/10',
        antiguedad: `${getYearsBetweenDates(operario.alta, dayjs().format('DD/MM/YYYY'))}`
    }))

    const apiRef = useGridApiRef();
    const { activeObra } = useContext( UiContext )
    const router = useRouter()
    const theme = useTheme()
    const [searchBox, setSearchBox] = useState<any[]>([])
    const [openModal, setOpenModal] = React.useState(false);
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const [columnVisible, setColumnVisible] = React.useState(ALL_COLUMNS);
    React.useEffect(() => {
        const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
        setColumnVisible(newColumns);
    }, [matches]);



    useEffect(() => {
        apiRef.current.setQuickFilterValues(searchBox)
      }, [searchBox])
    

    const editUser = 
        (id: GridRowId) => () => {
        router.push(`/personal/${id}`)
    }
    

    const columns: GridColDef[] = [
        { 
            field: 'id',
            headerName: 'Legajo',
            flex: 1,
            minWidth: 100,
            maxWidth: 150,
        },
        {
            field: 'name',
            headerName: 'Nombre',
            flex: 1,
            minWidth: 170,
            editable: false,
        },
        {
            field: 'obra',
            headerName: 'Obra',
            flex: 1,
            minWidth: 60,
            maxWidth: 150,
            editable: false,
        },
        {
            field: 'category',
            headerName: 'Categoría',
            flex: 1,
            minWidth: 50,
            maxWidth: 200,
            editable: false,
        },
        {
            field: 'asistencia',
            headerName: 'Asistencia',
            flex: 1,
            minWidth: 50,
            maxWidth: 100,
            editable: false,
            align: 'center'
        },
        {
            field: 'valoracion',
            headerName: 'Valoracion',
            flex: 1,
            minWidth: 50,
            maxWidth: 100,
            editable: false,
            align: 'center'
        },
        {
            field: 'antiguedad',
            headerName: 'Antiguedad',
            flex: 1,
            minWidth: 50,
            maxWidth: 100,
            editable: false,
            align: 'center'
        },
        {
            field: 'actions',
            headerName: 'Ver',
            type: 'actions',
            flex: 1,
            minWidth: 50,
            maxWidth: 100,
            editable: false,
            getActions: (params: any) => [
                <GridActionsCellItem
                    icon={<OpenInNewOutlinedIcon sx={{ color:theme.palette.primary.main }} />}
                    label="Open"
                    onClick={ editUser(params.id) }
                />,
            ],
        },

      ];

    const handleSearchInputChange = (input:any) => {
        setSearchBox(input)
      }

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
                    
                    <QuickSearch
                    data={ searchBox }
                    handleSearchInputChange={ handleSearchInputChange }
                    handleDataReset={ setSearchBox }
                    />

                    <Button 
                    sx={{mt:0.5, ml:0.5 }}
                    onClick={handleOpenModal}
                    >
                        Agregar
                    </Button>

                </Box>
                }
                title='Personal'
            />

            <PersonalAddModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                obraNames={obraNames}
                setIsMutating={setIsMutating}
            />

            <Divider/>
            <div style={{ width: '100%' }}>
                <DataGrid
                    apiRef={apiRef}
                    rows={rows}
                    columns={columns}
                    columnVisibilityModel={columnVisible}
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
                    filter: {
                        filterModel: {
                        items: [{ field: 'obra', operator: 'contains', value: activeObra?.idObra }],
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
            </div>
        </Card>
        <Divider/>
    </Grid>

  );
}


