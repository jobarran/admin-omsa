import { Grid, Card, CardHeader, Avatar, Button, CardContent, Typography, Divider, useTheme } from '@mui/material'
import React from 'react'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


export const PersonalCommentCard = () => {

    const theme = useTheme()

    
  return (
    
    <Grid item xs={12} height='100%'>
        <Card sx={{ boxShadow: 0, }}  >
        <CardHeader
            avatar={
              <Avatar>
                <MessageOutlinedIcon/>
              </Avatar>
            }
            title='Comentarios'
            action={

              <Button sx={{ color: theme.palette.primary.main, bgcolor: '#ffffff' }}>
                <AddCircleOutlinedIcon
                  //todo: onClick={}
                  sx={{ m:1 }}
                />
              </Button>
             
            }
          />
          <CardContent>

            <Typography variant="body2" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
              neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
              quasi quidem quibusdam.
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ fontStyle: 'italic' }}>
              17/08/2023 - Joaquin Barrandeguy
            </Typography>

            <Divider variant="middle" sx={{ m: 2  }} />

            <Typography variant="body2" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ fontStyle: 'italic' }}>
              17/08/2023 - Joaquin Barrandeguy
            </Typography>

            <Divider variant="middle" sx={{ m: 2  }} />

            <Typography variant="body2" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
              neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
              quasi quidem quibusdam.
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ fontStyle: 'italic' }}>
              17/08/2023 - Joaquin Barrandeguy
            </Typography>

            <Divider variant="middle" sx={{ m: 2  }} />

            <Typography variant="body2" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
              neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
              quasi quidem quibusdam.
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ fontStyle: 'italic' }}>
              17/08/2023 - Joaquin Barrandeguy
            </Typography>

          </CardContent>
        </Card>
      </Grid>

  )
}
