import { Avatar, Box, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Select } from '@mui/material'
import React, { FC, useEffect } from 'react'
import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Iremito } from '@/interfaces';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const remitos = [
  123456,
  654123,
  546987,
  631978,
  654197,
  664498,
  785469,
  136489,
  681354,
  464646,
  134687,
  967894
]


interface Props {
  remitoCode: string,
  remitoCodeChange: (newValue: any) => void,
  remitos: Iremito[]
}

export const RemitoSelectCard:FC<Props> = ({remitoCode, remitoCodeChange, remitos}) => {
  
  
  return (

    <Grid item xs={12} sm={6} lg={12}>
      <Card sx={{ boxShadow: 0, }}>
        <CardHeader
            avatar={
              <Avatar>
                <FolderOpenOutlinedIcon/>
              </Avatar>
            }
            title='Remitos'
        />
        <Divider />
        <CardContent>
          <Grid container  direction={'column'}>

          <Grid item >
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 600,
                overflow: "hidden",
                overflowY: "scroll",
               // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
              }}
            >
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="contacts"
              >
                {remitos.map((remito) => (
                  <ListItem
                    key={remito.number}
                    disablePadding
                    onClick={()=>remitoCodeChange(remito.number)}
                  >
                    <ListItemButton selected={ remito.number === remitoCode }>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary={remito.number} secondary={remito.date} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>



          </Grid>
        </CardContent>
      </Card>
    </Grid>


  )
}
