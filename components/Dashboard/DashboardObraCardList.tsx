import { FC } from "react"
import { Divider, Grid } from "@mui/material"
import { IObra } from "@/interfaces"
import { DashboardObraCard } from "./DashboardObraCard";

interface Props {
    obras: IObra[];
}

export const DashboardObraCardList: FC<Props> = ({ obras }) => {

  return (

    <>

    <Divider textAlign="center" sx={{ mb: '1rem' }}>Seleccionar Obra</Divider>

    <Grid container spacing={2} sx={{ mb: '1.5rem' }}>
        {
            obras.map( obra => (
                //si estado activo
                <DashboardObraCard
                    key={obra.name}
                    obra={obra}
                />
            ))
        }
    </Grid>
    
    </>
  )
}
