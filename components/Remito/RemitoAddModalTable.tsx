import { Autocomplete, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { GridColDef, GridActionsCellItem, DataGrid, GridRowId, GridValidRowModel, GridRowsProp } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { FC, useState, useEffect } from 'react';
import { useOm } from '@/hooks';
import { IOm } from '@/interfaces';

interface Props {
    elementRows: readonly GridValidRowModel[],
    setElementRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>,
    obra: any
}


const options = ['opcion1', 'opcion2', 'opcion3']

export const RemitoAddModalTable:FC<Props> = ({ elementRows, setElementRows, obra }) => { 

    const initData: any = []

    const initialRows: GridRowsProp  = initData.map( (elemento: any) => ({
        om      : elemento.om,
        codigo  : elemento.codigo,
        id      : elemento.id,
        cantidad: elemento.cantidad,
    }))

    const { data, error, isLoading, mutate } = useOm(`/om?idObra=${obra.idObra}`)

    const [elementOm, setElementOm] = useState<string | null>(null);
    const [elementCode, setElementCode] = useState<string | null>(null);
    const [elementId, setElementId] = useState('')
    const [elementQuantity, setElementQuantity] = useState('')
    const [elementQuantityError, setElementQuantityError] = useState(false)
    const [elementCodeError, setElementCodeError] = useState(false)
    const [elementIdError, setElementIdError] = useState(false)

    useEffect(() => {
      setElementRows(initialRows)
    }, [])

    useEffect(() => {
      setElementCode(null)
    }, [elementOm])
    
    


    const columns: GridColDef[] = [
        { 
            field: 'om',
            headerName: 'OM',
            editable: false,
            flex: 1,
            minWidth: 60,
            maxWidth: 150,
            disableColumnMenu: true
        },
        { 
            field: 'code',
            headerName: 'Código',
            editable: false,
            flex: 1,
            minWidth: 60,
            maxWidth: 150,
            disableColumnMenu: true
        },
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            editable: false,
            sortable: false,
            disableColumnMenu: true
        },
        {
            field: 'cantidad',
            headerName: 'Cantidad',
            flex: 1,
            editable: false,
            sortable: false,
            disableColumnMenu: true
        },
        {
            field: 'actions',
            headerName: 'Eliminar',
            type: 'actions',
            flex: 1,
            minWidth: 40,
            maxWidth: 80,
            editable: false,
            getActions: (params: any) => [
                <GridActionsCellItem
                  key={params.id}
                  icon={
                    <Tooltip title="Eliminar" arrow>
                      <DeleteOutlineIcon sx={{ color:'error' }} />
                    </Tooltip>
                  }
                  label="Eliminar"
                  onClick={handleDeleteElement(params.id)}
                />,
            ],
        },
      ];


      const handleAddElement = () => {

        setElementCodeError(false)
        setElementQuantityError(false)
        setElementIdError(false)

        if (elementCode === null) {
            setElementCodeError(true)
            return
        }

        if (elementQuantity === '') {
            setElementQuantityError(true)
            return
        }

        const requireId = getElementIdValidation()

        if ( requireId && elementId === '') {
            setElementIdError(true)
            return
        }

        const codeExists = elementRows.some(item => item.om+item.code+item.id === elementOm+elementCode+elementId)

        if (!codeExists) {

            setElementRows([
                ...elementRows,
                {om: elementOm, code: elementCode, id: elementId, quantity: elementQuantity}
            ])
            setElementOm(null)
            setElementCode(null)
            setElementId('')
            setElementQuantity('')
            setElementCodeError(false)
            setElementQuantityError(false)
            setElementIdError(false)
        } else {
            console.log('ya existe')
        }
    }

    const handleDeleteElement = (id: GridRowId) => () => {
        setElementRows(elementRows.filter(item => item.code !== id))
    }

    function getElementIdValidation() {


        if ( elementOm ) {
            const selectedObject = data.find((obj:IOm) => obj.name === elementOm);
            if (selectedObject) {
                const nestedObject = selectedObject['element'].find((element:any) => element.type === 'modulo');
                return nestedObject ? true : false;
              } else {
                return false; 
              }
        }
      }

    const getElementByOm = () => {
        const om =  data.find(item => item.name === elementOm);
        
        if ( !!om ) {
           return om?.element.map(element => element.code)
        }
        return []  
    }

    const codeOptions = getElementByOm()


  return (

    <>
    
        <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>
            <Grid item xs={6} sm={3} >
                <Autocomplete
                    size='small'
                    disablePortal
                    options={data.map(om => om.name)}
                    value={elementOm}
                    onChange={(event: any, newValue: string | null) => {
                        setElementOm(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Om" />}
                    
                />
            </Grid>
            <Grid item xs={6} sm={3} >
                <Autocomplete
                    size='small'
                    disablePortal
                    options={codeOptions}
                    value={elementCode}
                    onChange={(event: any, newValue: string | null) => {
                        setElementCode(newValue);
                    }}
                    renderInput={(params) => 
                        <TextField
                        {...params}
                        label="Code"
                        error={ elementCodeError }
                        helperText={ !elementCodeError ? '' : 'Debe indicar un código' }
                    />}
                />
            </Grid>
            <Grid item xs={6} sm={3} >
                <TextField
                    size='small'
                    label="ID"
                    variant="outlined"
                    type='number'
                    fullWidth 
                    value={elementId}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setElementId(event.target.value);
                    }}
                    error={ elementIdError }
                    helperText={ !elementIdError ? '' : 'Debe indicar cantidad' }
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <TextField
                    size='small'
                    label="Cantidad"
                    variant="outlined"
                    type='number'
                    fullWidth
                    value={elementQuantity}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setElementQuantity(event.target.value);
                    }}
                    error={ elementQuantityError }
                    helperText={ !elementQuantityError ? '' : 'Debe indicar cantidad' }
                />
            </Grid>
            <Grid item xs={2} sm={1} >
                <IconButton
                    onClick={handleAddElement}
                >
                    <AddCircleOutlinedIcon color='primary'/>
                </IconButton>
            </Grid>
        </Grid>

        <Grid item xs={12}>
            <DataGrid
                rows={elementRows}
                columns={columns}
                rowHeight={35}
                getRowId={(row) => row.om+row.code+row.id}
                // columnVisibilityModel={columnVisible}
                hideFooterSelectedRowCount
                hideFooterPagination
                autoHeight={true}
                disableRowSelectionOnClick
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'code', sort: 'asc' }],
                    },
                }}
                sx={{
                    border: 0,
                }}
            />
        </Grid>
    </>

  )
}
