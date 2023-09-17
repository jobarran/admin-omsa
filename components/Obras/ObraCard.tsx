import { IObra } from "@/interfaces"
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { FC } from "react"

interface Props {
  obra: IObra
}

export const ObraCard: FC<Props> = ({ obra }) => {


  return (

  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    lg={3}
    key={obra.name}
  >
    <Card
       sx={{ display: 'flex', }}

    >
      <CardActionArea>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h4">
              {obra.idObra}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {obra.name}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>




  </Grid>
  )
}
