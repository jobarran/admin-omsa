import { IPersonal } from '@/interfaces'
import personal from '@/pages/api/obras/personal'
import { yearDif } from '@/utils'
import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface Props {
    personal: IPersonal
}

export const PersonalInfoCard:FC<Props> = ({personal}) => {

    const theme = useTheme()


  return (


    <Grid item xs={12}>
        <Card sx={{ boxShadow: 0, }} >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: theme.palette.primary.main }} aria-label="recipe">
                {personal.name[0]+personal.lastName[0]}
              </Avatar>
            }
            title={ personal.legajo }
            titleTypographyProps={{variant:'h5' }}
            subheader={`${ personal.name } ${ personal.lastName }`}
            action={
              <Button sx={{ color: theme.palette.primary.main, bgcolor: '#ffffff' }
              }>
                <EditOutlinedIcon
                  //todo: onClick={}
                  sx={{ m:1 }}
                />
              </Button>
            }
          />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 15 }} color="text.secondary">
                Edad
              </Typography>
              <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                { yearDif(personal.nacimiento || '') }
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={{ fontSize: 15 }} color="text.secondary">
                Fecha de nacimiento
              </Typography>
              <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
              { personal.nacimiento }
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 15 }} color="text.secondary">
                Teléfono
              </Typography>
              <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                { personal.telefono }
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={{ fontSize: 15 }} color="text.secondary">
                Dirección
              </Typography>
              <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
              { personal.direccion }
              </Typography>
            </Grid>
          </Grid>

          <Divider variant="middle" sx={{ mb: 2 }} />
          
          <Typography sx={{ fontSize: 15 }} color="text.secondary">
              Categoría
          </Typography>
          <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
          { personal.categoria }
          </Typography>
          <Typography sx={{ fontSize: 15 }} color="text.secondary">
              Antiguedad
          </Typography>
          <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
            { yearDif(personal.alta) }  años
          </Typography>
          <Typography sx={{ fontSize: 15 }} color="text.secondary">
              Categoría
          </Typography>
          <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
              Capataz
          </Typography>

          <Typography variant="body1">
              Educating people with text based content.
          </Typography>
        </CardContent>
        </Card>
      </Grid>


  )
}
