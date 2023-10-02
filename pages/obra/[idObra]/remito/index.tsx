import { ObraLayout } from "@/components/layouts"
import { dbObras, dbRemito, dbUsers } from "@/database"
import { IObra, IUser, Iremito } from "@/interfaces"
import { GetServerSideProps, NextPage } from "next"
import { CustomBreadCrumbs } from "@/components/ui";
import { Grid } from "@mui/material";
import { useState } from "react";
import { RemitoSelectCard } from "@/components/Remito";
import { RemitoDataGrid } from "@/components/Remito/RemitoDataGrid";
import { useRemito } from "@/hooks";



interface Props {
    obra: IObra,
    obraNames: {
      idObra: string,
      name  : string
    }[],
    remitos: Iremito[]
}


export const ObraRemitoPage: NextPage<Props> = ({ obra, obraNames, remitos }) => {

  const [remitoCode, setRemitoCode] = useState('')
  const [remitoSelected, setRemitoSelected] = useState<Iremito | undefined>(remitos[0])
  
  const breadcrumbsRef = [
    { key: 'obra', name: obra.name, link: `/obra/${obra.idObra}` },
    { key: 'breadSecond', name: 'Remito', link: undefined },
  ]

  const handleRemitoCodeChange = (newValue: any) => {
    setRemitoCode(newValue)
    setRemitoSelected(remitos.find((obj:any) => obj.number === newValue))
  } 

  return (
    <>
      <ObraLayout
        title={`${ obra.name + ' - ' + obra.idObra }`}
        pageDescription={"Remito"}
      >

        <CustomBreadCrumbs
          references={ breadcrumbsRef }
        />

        <Grid container spacing={2}>
            
            <Grid container item spacing={2} xs={12} lg={3} >

              <RemitoSelectCard 
                remitoCode={remitoCode}
                remitoCodeChange={handleRemitoCodeChange}
                remitos={remitos}
              />
              

            </Grid>

            <Grid container item spacing={2} xs={12} lg={9}>

                
                <RemitoDataGrid
                  obra={obra}
                  obraNames={obraNames}
                  remito={ remitoSelected } 
                />  
                
            
                              
            </Grid>

        </Grid>

      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
  const { idObra } = params as { idObra: string }

  const obra = await dbObras.getObrasById( idObra.toString() );
  const obraNames = await dbObras.getAllObras();
  const remitos = await dbRemito.getRemitoByObra( idObra.toString() )

  return {
      props: { 
        obra: obra,
        obraNames: obraNames,
        remitos: remitos
       }
  }
}
  

export default ObraRemitoPage