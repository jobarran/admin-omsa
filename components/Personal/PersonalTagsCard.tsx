import { Grid, Card, CardHeader, Avatar, Button, CardContent, Chip, useTheme } from '@mui/material'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { FC } from 'react';
import { IPersonal } from '@/interfaces';

interface Props {
    personal: IPersonal
}

export const PersonalTagsCard:FC<Props> = ({personal}) => {

    const theme = useTheme()

  return (
    
    <Grid item xs={12}  height='100%'>
        <Card sx={{ boxShadow: 0, }} >

          <CardHeader
            avatar={
              <Avatar>
                <LocalOfferOutlinedIcon/>
              </Avatar>
            }
            title='Tags'
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
          <CardContent>
            <Grid container spacing={2} >
          
            {
              personal.tags.map( tag => (
                
              
              <Chip
                key={tag}
                label={tag}
                color="primary"
                variant="outlined"
                sx={{ m:0.5 }}
                />

              ))
            }

            </Grid>

          </CardContent>
        </Card>
      </Grid>

  )
}
