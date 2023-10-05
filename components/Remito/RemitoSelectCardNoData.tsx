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

export const RemitoSelectCardNoData:FC<Props> = ({remitoCode, remitoCodeChange, remitos}) => {
  
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


           
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 200,
                    overflow: "hidden",
                    overflowY: "scroll",
                  // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                  }}
                >
                  
                </Box>       

          </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>


  )
}
