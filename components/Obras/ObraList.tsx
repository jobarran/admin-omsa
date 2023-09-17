import { FC } from "react"
import { Divider, Grid } from "@mui/material"
import { IObra } from "@/interfaces"
import { ObraCard } from "./ObraCard";

interface Props {
    obras: IObra[];
}

export const ObraList: FC<Props> = ({ obras }) => {

  return (

    <>

    <Divider textAlign="center" sx={{ mb: '1rem' }}>Seleccionar Obra</Divider>

    <Grid container spacing={4} sx={{ mb: '1.5rem' }}>
        {
            obras.map( obra => (
                <ObraCard
                    key={obra.name}
                    obra={obra}
                />
            ))
        }
    </Grid>
    
    </>
  )
}
