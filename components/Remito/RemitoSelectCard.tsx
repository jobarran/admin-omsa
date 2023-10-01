import { Avatar, Box, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Select } from '@mui/material'
import React, { FC } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers'
import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';

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
}

export const RemitoSelectCard:FC<Props> = ({remitoCode, remitoCodeChange}) => {
  
  return (

    <Grid item xs={12} sm={6} lg={12}>
      <Card sx={{ boxShadow: 0, }}>
        <CardHeader
            avatar={
              <Avatar>
                <ListAltIcon/>
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
                {remitos.map((name) => (
                  <ListItem
                    key={name}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary={name} secondary={'12/09/2023'} />
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
