
import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Skeleton } from '@mui/material';

import { ObraLayout } from "@/components/layouts"
import { useContext, useEffect, useState } from "react";
import { CustomBreadCrumbs } from '@/components/ui';
import { UiContext } from "@/context";
import { OmDataGrid } from "@/components/Om";
import { GetServerSideProps, NextPage } from 'next';
import { dbObras, dbOm } from '@/database';
import { IObra, IOm } from '@/interfaces';
import { useOm } from '@/hooks';


interface Props {
  obra: IObra,
}

const ObraOmPage: NextPage<Props> = ({obra}) => {

  const { activeObra } = useContext(UiContext)
  const [isMutating, setIsMutating] = useState(false)
  const { data, error, isLoading, mutate } = useOm(`/om?idObra=${obra.idObra}`)


  useEffect(() => {
    mutate()
  }, [isMutating])


  const breadcrumbsRef = [
    { key: 'obra', name: obra.name, link: `/obra/${obra.idObra}` },
  ] 

  

  return (

    <>
      <ObraLayout
        title={`${ activeObra?.name + ' - Asistencia' }`}
        pageDescription={"Asistencia"}
      >
      
          <CustomBreadCrumbs references={ breadcrumbsRef }/>       

        <Grid container spacing={2}>
          
          {
            data && !isLoading
            ? <OmDataGrid data={data} obra={obra} setIsMutating={setIsMutating} />
            : <></>
          }

        </Grid>

      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
  const { idObra } = params as { idObra: string }

  const obra = await dbObras.getObrasById( idObra.toString() );


  return {
      props: { 
        obra: obra,
       }
  }
}

export default ObraOmPage