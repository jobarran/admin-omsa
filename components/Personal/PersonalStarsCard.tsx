import { Grid, Card, CardHeader, Avatar, CardContent, Box, Divider, Rating } from "@mui/material"
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import { FC } from "react";

interface Props {
    name: string,
    value: number
}

export const PersonalStarsCard:FC<Props> = ({ name, value }) => {
  return (
    
    <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: 0, }} >
          <CardHeader
            avatar={
              <Avatar>
                <ListAltRoundedIcon/>
              </Avatar>
            }
            title={name}
          />
          <CardContent>

            {/* <Typography style={{display: 'inline-block'}} variant="h6" >
              234
            </Typography>
            <Typography style={{display: 'inline-block'}}  variant="caption" display="block"  >
              /234
            </Typography>
            <Typography variant="caption" display="block" gutterBottom >
              Inasistencias
            </Typography> */}

            
          <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Divider variant="middle" sx={{ mb: 2  }} />
              <Rating
                name="read-only"
                value={value}
                readOnly
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
          </Box>
          </CardContent>
        </Card>
      </Grid>

  )
}
