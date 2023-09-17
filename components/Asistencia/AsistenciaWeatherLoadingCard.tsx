import { Avatar, Card, CardContent, CardHeader, Divider, Grid, SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, TextField, makeStyles, Skeleton } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react'
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import { lightTheme } from '@/themes';
import { IAsistencia } from '@/interfaces';


export const AsistenciaWeatherLoadingCard = () => {
  
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
            <Skeleton variant="rounded" width='100%' height={20} sx={{ mt:2, mb:1, bgcolor: 'grey.100' }} />
            </Grid>

            <Grid item xs={12} sm={6} lg={12}>
            <Skeleton variant="rounded" width='100%' height={20} sx={{ mt:1, mb:1, bgcolor: 'grey.100' }} />
            </Grid>

            <Grid item xs={12}>
            <Skeleton variant="rounded" width='100%' height={20} sx={{ mt:1, mb:2, bgcolor: 'grey.100' }} />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>


  )
}
