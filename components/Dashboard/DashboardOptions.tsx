import { IObra } from "@/interfaces"
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { FC } from "react"

interface Props {
  option: string
}

export const DashboardOptions: FC<Props> = ({option}) => {

  const theme = useTheme()


  return (

    <Grid
      item
      xs={6}
      sm={4}
      md={2}
      key={option}
    >
      <Card
        sx={{
          display: 'flex',
          boxShadow: 0,
          '&:hover': {
            //outline: `1px solid ${ theme.palette.primary.main }`,
            backgroundColor: theme.palette.primary.light,
            transition: '0.5s',

          }
        }}
  
      >
        <CardActionArea>
          <Box sx={{ display: 'flex', flexDirection: 'column', boxShadow: 0 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <Avatar>
              
            </Avatar>
            <Typography sx={{ mt:2 }} variant="subtitle2" color="text.secondary" component="div">
                {option}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
  
  
  
  
    </Grid>
    )
  }
  