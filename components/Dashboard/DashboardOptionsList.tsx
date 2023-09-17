import { FC } from "react"
import { Divider, Grid } from "@mui/material"
import { IObra } from "@/interfaces"
import { DashboardObraCard } from "./DashboardObraCard";
import { DashboardOptions } from ".";


export const DashboardOptionsList = () => {

    const options = [
        'Personal', 'Equipos'
    ]

  return (

    <>

    <Divider textAlign="center" sx={{ mb: '1rem' }}>Opciones</Divider>

    <Grid container spacing={4} sx={{ mb: '1.5rem' }}>
        {
            options.map( option => (
                <DashboardOptions
                    key={option}
                    option={option}
                />
            ))
        }
    </Grid>
    
    </>
  )
}
