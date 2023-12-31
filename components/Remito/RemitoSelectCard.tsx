import { Avatar, Box, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Iremito } from '@/interfaces';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

interface Props {
  remitoCode: string,
  remitoCodeChange: (newValue: any) => void,
  remitos: Iremito[] | never[] 
}

export const RemitoSelectCard:FC<Props> = ({remitoCode, remitoCodeChange, remitos}) => {
  
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [ visibility, setVisibility ] = useState(true);

  useEffect(() => {
      const newVisibility = matches ? true : false;
      setVisibility(newVisibility);
  }, [matches]);
  
  return (

    <Grid item xs={12}>
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


            {
              visibility
              ?
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 250,
                    maxHeight: 600,
                    overflow: "hidden",
                    overflowY: remitos.length > 0 ? "scroll" : "hidden",
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
              :
                <FormControl sx={{ m: 1, width:'100%'}} size="small">
                  <InputLabel id="demo-select-small-label">Remito</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={remitoCode}
                    label="Remito"
                  >
                    {remitos.map((remito) => (
                      <MenuItem
                        key={remito.number}
                        value={`${remito.number}`}
                        onClick={()=>remitoCodeChange(remito.number)}
                      >{remito.number}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

            }


            



          </Grid>



          </Grid>
        </CardContent>
      </Card>
    </Grid>


  )
}
