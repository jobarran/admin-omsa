import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import React, { FC } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers'
import 'dayjs/locale/es' // load on demand


interface Props {
  dayValue: Dayjs | null,
  dayValueChange: (newValue: any) => void,
}

export const AsistenciaDateCard:FC<Props> = ({dayValue, dayValueChange}) => {
  
  return (

    <Grid item xs={12} sm={6} lg={12}>
      <Card sx={{ boxShadow: 0, }}>
        <CardHeader
            avatar={
              <Avatar>
                <CalendarMonthOutlinedIcon/>
              </Avatar>
            }
            title='Fecha'
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2} direction={'column'}>

            <LocalizationProvider 
              dateAdapter={AdapterDayjs}
              adapterLocale='es'
              localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}  
            >

              <Grid item sx={{ mt:{sm:3.5, lg:0}, mb:{sm:3.5, lg:0} }}>
                <DatePicker
                  label="Fecha"
                  format="DD/MM/YYYY"
                  disableFuture
                  slotProps={{
                    textField: { size: 'small', fullWidth: true },                  
                  }}
                  value={dayValue}
                  onChange={(newValue) => dayValueChange(newValue)}
                />
              </Grid>


            </LocalizationProvider>

          </Grid>
        </CardContent>
      </Card>
    </Grid>


  )
}
