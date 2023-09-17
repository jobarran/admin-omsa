import { Avatar, Card, CardContent, CardHeader, Divider, Grid, SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, TextField, makeStyles } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react'
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import { lightTheme } from '@/themes';
import { IAsistencia } from '@/interfaces';

interface Props {
  parte: any,
  parteChange: (newValue: any) => void,
}

export const AsistenciaWeatherCard:FC<Props> = ({parte, parteChange}) => {

  const handleParteChange =  (event: SelectChangeEvent | ChangeEvent ) => {
    parteChange(event.target);
  };
  
  return (

    <Grid item xs={12} sm={6} lg={12} height='100%'>
      <Card sx={{ boxShadow: 0 }}>
        <CardHeader
            avatar={
              <Avatar>
                <ThunderstormOutlinedIcon/>
              </Avatar>
            }
            title='Clima'
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} lg={12}>
              <FormControl sx={{ width:'100%' }} size="small">
                <InputLabel id="demo-select-small-label">Montaje</InputLabel>
                <Select
                  name='montaje'
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={parte.montaje}
                  label="Montaje"
                  onChange={handleParteChange}
                >
                    <MenuItem value='si'>Si</MenuItem>
                    <MenuItem value='parcial'>Parcial</MenuItem>
                    <MenuItem value='no'>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} lg={12}>
              <FormControl sx={{ width:'100%' }} size="small">
                <InputLabel id="demo-select-small-label">Motivo</InputLabel>
                <Select
                  name='clima'
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={parte.clima}
                  label="Clima"
                  onChange={handleParteChange}
                >
                    <MenuItem value='lluvia'>Lluvia</MenuItem>
                    <MenuItem value='viento'>Viento</MenuItem>
                    <MenuItem value='material'>Material</MenuItem>
                    <MenuItem value='uocra'>UOCRA</MenuItem>
                    <MenuItem value='otro'>Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            

            <Grid item xs={12}>
               <TextField
                  name='observaciones'
                  id="outlined-multiline-static"
                  label="Observaciones"
                  multiline
                  size='small'
                  sx={{ width:'100%' }}
                  value={parte.observaciones}
                  onChange={handleParteChange}
                />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>


  )
}
