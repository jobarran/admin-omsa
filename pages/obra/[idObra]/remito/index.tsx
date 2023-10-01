import { ObraLayout } from "@/components/layouts"
import { dbObras, dbUsers } from "@/database"
import { IObra, IUser } from "@/interfaces"
import { GetServerSideProps, NextPage } from "next"
import { CustomBreadCrumbs } from "@/components/ui";
import { Grid } from "@mui/material";
import { useState } from "react";
import { RemitoSelectCard } from "@/components/Remito";
import { RemitoDataGrid } from "@/components/Remito/RemitoDataGrid";



interface Props {
    obra: IObra,
    obraNames: {
      idObra: string,
      name  : string
    }[],
}


export const ObraRemitoPage: NextPage<Props> = ({ obra, obraNames }) => {

  const [remitoCode, setRemitoCode] = useState('')

  const breadcrumbsRef = [
    { key: 'obra', name: obra.name, link: `/obra/${obra.idObra}` },
    { key: 'breadSecond', name: 'Remito', link: undefined },
  ]

  const onGetRemito = (newValue: any) => {

  }

  const handleRemitoCodeChange = (newValue: any) => {
    setRemitoCode(newValue)
    onGetRemito(newValue)
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
              />
              

            </Grid>

            <Grid container item spacing={2} xs={12} lg={9}>

                <RemitoDataGrid
                  obra={obra}
                  obraNames={obraNames}
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

  return {
      props: { 
        obra: obra,
        obraNames: obraNames
       }
  }
}
  

export default ObraRemitoPage