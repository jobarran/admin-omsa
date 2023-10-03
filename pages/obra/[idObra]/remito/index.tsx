import { ObraLayout } from "@/components/layouts"
import { dbObras, dbRemito, dbUsers } from "@/database"
import { IObra, IUser, Iremito } from "@/interfaces"
import { GetServerSideProps, NextPage } from "next"
import { CustomBreadCrumbs } from "@/components/ui";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { RemitoSelectCard } from "@/components/Remito";
import { RemitoDataGrid } from "@/components/Remito/RemitoDataGrid";
import { useRemito } from "@/hooks";
import { GridRowsProp } from "@mui/x-data-grid";



interface Props {
    obra: IObra,
    obraNames: {
      idObra: string,
      name  : string
    }[],
    lastRemito: Iremito
}


export const ObraRemitoPage: NextPage<Props> = ({ obra, obraNames, lastRemito }) => {

  const { data, error, isLoading, mutate } = useRemito(`/remito?obra=${obra.idObra}`)
  const [remitoCode, setRemitoCode] = useState(lastRemito.number)
  const [isMutating, setIsMutating] = useState(false)
  const [remitoSelected, setRemitoSelected] = useState<any>(lastRemito)
  
  const breadcrumbsRef = [
    { key: 'obra', name: obra.name, link: `/obra/${obra.idObra}` },
    { key: 'breadSecond', name: 'Remito', link: undefined },
  ]

  useEffect(() => {
    mutate()
  }, [isMutating])

  const handleRemitoCodeChange = (newValue: any) => {
    setRemitoCode(newValue)
    setRemitoSelected(data.find((obj:any) => obj.number === newValue))
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
            
            <Grid container item spacing={2} xs={12} md={4} lg={3} >

              {
                data && !isLoading
                ?
                  <RemitoSelectCard 
                    remitoCode={remitoCode}
                    remitoCodeChange={handleRemitoCodeChange}
                    remitos={data}
                    
                  />
                : 
                <></>
              }
              
              

            </Grid>

            <Grid container item spacing={2} xs={12} md={8} lg={9}>

            {
                data && !isLoading
                ?
                <RemitoDataGrid
                  obra={obra}
                  obraNames={obraNames}
                  remitoSelected={remitoSelected}
                  setIsMutating={setIsMutating}
                />
                : <></>  
            }
            
                              
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
  const lastRemito = await dbRemito.getLastRemitoByObra( idObra.toString() )

  return {
      props: { 
        obra: obra,
        obraNames: obraNames,
        lastRemito: lastRemito
       }
  }
}
  

export default ObraRemitoPage