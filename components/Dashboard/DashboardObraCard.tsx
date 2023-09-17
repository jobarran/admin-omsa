import { AuthContext } from "@/context/auth";
import { IObra } from "@/interfaces"
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { info } from "console";
import { useRouter } from "next/router";
import { FC, useContext } from "react"
import { UiContext } from '../../context/ui/UiContext';


interface Props {
  obra: IObra
}

export const DashboardObraCard: FC<Props> = ({ obra }) => {

  const { user } = useContext( AuthContext )
  const theme = useTheme()
  const router = useRouter()


  const handleClick = ( url: string ) => {
    router.push(url)
}

  return (
    <Tooltip title={ user?.role === 'user' && !user?.obra?.includes(obra.idObra) ? "No tienes permiso para acceder a esta obra" : "" } followCursor>
    <Grid
      item
      xs={6}
      sm={4}
      md={2}
      key={obra.name}
    >
      <Card
        sx={{
          display: 'flex',
          boxShadow: 0,
          backgroundColor: user?.role === 'user' && !user?.obra?.includes(obra.idObra) ? theme.palette.background.default : '',
          border: user?.role === 'user' && !user?.obra?.includes(obra.idObra) ? 1 : 0,
          borderStyle: "dashed",
          borderColor: theme.palette.primary.light,
          '&:hover': {
            //outline: `1px solid ${ theme.palette.primary.main }`,
            backgroundColor: 'transparent',
              ...( user?.role === 'user' && user?.obra?.includes(obra.idObra) && {
                backgroundColor: theme.palette.primary.light,
                transition: '0.5s',
              }),
              ...( user?.role === 'admin' && {
                backgroundColor: theme.palette.primary.light,
                transition: '0.5s',
              }),

          }
        }}
  
      >
        
        <CardActionArea
          disabled={ user?.role === 'user' && !user?.obra?.includes(obra.idObra) }
          onClick={ () => handleClick(`/obra/${obra.idObra}`) }
        >
          
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h4">
                {obra.idObra}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                {obra.name}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
  
  
  
  
    </Grid>
    </Tooltip>
    )
  }
  