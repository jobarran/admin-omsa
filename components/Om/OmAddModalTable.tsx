import { Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { GridColDef, GridActionsCellItem, DataGrid, GridRowId, GridValidRowModel } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { FC } from 'react';

interface Props {
    elementRows: readonly GridValidRowModel[],
    setElementRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>,
    code: string,
    setCode: React.Dispatch<React.SetStateAction<string>>,
    quantity: string,
    setQuantity: React.Dispatch<React.SetStateAction<string>>,
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    codeError: boolean,
    setCodeError: React.Dispatch<React.SetStateAction<boolean>>
}

export const OmAddModalTable:FC<Props> = ({
    elementRows,
    setElementRows,
    code,
    setCode,
    quantity,
    setQuantity,
    description,
    setDescription,
    codeError,
    setCodeError
}) => { 

    const columns: GridColDef[] = [
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
            field: 'quantity',
            headerName: 'Cantidad',
            editable: false,
            flex: 1,
            minWidth: 50,
            maxWidth: 70,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'description',
            headerName: 'Descripcion',
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

        const codeExists = elementRows.some(item => item.code === code)

        if (!codeExists) {
            setElementRows([
                ...elementRows,
                {code: code, quantity: quantity, description: description, received: 0}
            ])
            setCode('')
            setQuantity('')
            setDescription('')
            setCodeError(false)
          } else {
            setCodeError(true)
          }
    }

    const handleDeleteElement = (id: GridRowId) => () => {
        setElementRows(elementRows.filter(item => item.code !== id))
    }

  return (

    <>
    
        <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>
            <Grid item xs={6} sm={3} >
                <TextField
                    size='small'
                    label="Código"
                    variant="outlined"
                    fullWidth 
                    value={code}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCode(event.target.value);
                    }}
                    error={ codeError }
                    helperText={ !codeError ? '' : 'Códdigo repetido' }
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <TextField
                    size='small'
                    label="Cantidad"
                    variant="outlined"
                    type='number'
                    fullWidth
                    value={quantity}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setQuantity(event.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={10} sm={6}>
                <TextField
                    size='small'
                    label="Descripción"
                    variant="outlined"
                    fullWidth 
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDescription(event.target.value);
                    }}
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

        <Grid item xs={12} sx={{ mb:2}}>
            <DataGrid
                rows={elementRows}
                columns={columns}
                rowHeight={35}
                getRowId={(row) => row.code}
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
