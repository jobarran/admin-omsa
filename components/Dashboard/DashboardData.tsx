import { IObra } from "@/interfaces"
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { FC } from "react"
import BasicTable from "./table"



export const DashboardData = () => {

  const theme = useTheme()


  return (

    <>

      <Divider textAlign="center" sx={{ mb: '1rem' }}>Datos</Divider>

      <BasicTable />

    </>

    )
  }
  