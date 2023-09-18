import { GetServerSideProps, NextPage } from "next"

import { Card, Grid, Skeleton, makeStyles } from '@mui/material';

import { ObraLayout } from "@/components/layouts"
import { dbAsistencia, dbObras, dbPersonal } from "@/database"
import { IObra } from "@/interfaces"
import { useContext, useEffect, useState } from "react";
import { CustomBreadCrumbs } from '@/components/ui';
import dayjs, { Dayjs } from "dayjs";
import { AsistenciaDataGridLoading, AsistenciaDateCard, AsistenciaWeatherLoadingCard } from "@/components/Asistencia";
import { AsistenciaDataGrid } from "../../../../components/Asistencia";
import { adminObraApi } from "@/api";
import { useAsistencia, usePersonal } from "@/hooks";
import { AsistenciaWeatherCard } from '../../../../components/Asistencia/AsistenciaWeatherCard';
import { UiContext } from "@/context";
import { useRouter } from "next/router";


interface Props {
    personal: {
      legajo: string,
      name: string,
      lastName: string,
      obra: string
    }[],
    obraNames: {
      idObra: string,
      name  : string
    }[],
}

export const ObraAsistenciaPage: NextPage<Props> = ({ personal, obraNames }) => {

  const [dayValue, setDayValue] = useState<Dayjs>(dayjs());
  const router = useRouter()
  const { activeObra } = useContext(UiContext)
  const [isMutating, setIsMutating] = useState(false)
  const { data: dataAsistencia, error, isLoading, mutate } = useAsistencia(`/asistencia/${dayValue.format('YYYYMMDD').toString()}`)
  const { data: dataPersonal } = usePersonal(`/personal`)
  const [parte, setParte] = useState({ clima: '', montaje: '', observaciones: ''})


  const breadcrumbsRef = [
    { key: 'obra', name: activeObra?.name, link: `/obra/${activeObra?.idObra}` },
    { key: 'breadSecond', name: 'asistencia', link: undefined },
  ] 

  useEffect(() => {
      onGetOrCreateAsistencia()
  }, [dayValue])  

  useEffect(() => {
      mutate()
  }, [isMutating===true])
  

  const handleDayValueChange = (newValue: any) => {
    console.log('cambiando fecha')
    setDayValue(newValue)
  } 

  const handleParteChange = (newValue: any) => {
    setParte(prevState => ({
      ...prevState,
      [newValue.name]: newValue.value
    }))
  }

  const onGetOrCreateAsistencia = async () => {
    
    const {data} = await adminObraApi.post(`/asistencia`, { 
      fecha: dayValue.format('YYYYMMDD').toString(),
      asistenciaData: isLoading ? dataPersonal : [],
      clima: parte.clima,
      montaje: parte.montaje,
      observaciones: parte.observaciones
     });

    setParte({
      clima: data.clima,
      montaje: data.montaje,
      observaciones: data.observaciones
    })

  }

  const onUpdateAsistenciaById = async (rows: any) => {

    if (rows.length === 0 ) {
      return
    }

    await adminObraApi.put(`/asistencia/${dayValue.format('YYYYMMDD').toString()}`, { 
        rowsData: rows,
        clima: parte.clima,
        montaje: parte.montaje,
        observaciones: parte.observaciones
      }); 
   }

  const onUpdatePersonalList = async () => {

    await adminObraApi.put(`/asistencia`, {
      fecha: dayValue.format('YYYYMMDD').toString(),
      data: isLoading ? dataPersonal : []
    })
  }

  return (

    <>
      <ObraLayout
        title={`${ activeObra?.name + ' - Asistencia' }`}
        pageDescription={"Asistencia"}
      >
        {
          !!activeObra
          ? <CustomBreadCrumbs references={ breadcrumbsRef }/>
          : <Skeleton animation="wave" variant="rounded" width={250} height={25} sx={{  bgcolor: 'grey.100', mt:2, mb:2 }}/>
        }

        

        <Grid container spacing={2}>
          
          <Grid container item spacing={2} xs={12} lg={3} >

            <AsistenciaDateCard 
              dayValue={dayValue}
              dayValueChange={handleDayValueChange}
            />

            {
              !!dataAsistencia && !isLoading 
              ? 
              <AsistenciaWeatherCard
                parte={parte}
                parteChange={handleParteChange}
              />
              : <AsistenciaWeatherLoadingCard />
            }
            

          </Grid>

          <Grid container item spacing={2} xs={12} lg={9}>

            {
              !!dataAsistencia && !isLoading
              ?
              <AsistenciaDataGrid
                data={dataAsistencia}
                onUpdateRow={onUpdateAsistenciaById}
                obraNames={obraNames}
                onUpdatePersonal={onUpdatePersonalList}
                setIsMutating={setIsMutating}
                isMutating={isMutating}
              />   
              : <AsistenciaDataGridLoading />
            }
           
                            
          </Grid>

      </Grid>

      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const obraNames = await dbObras.getAllObras();
  const personal = await dbPersonal.getAllPersonal()
  await dbAsistencia.getOrCreateAsistencia(personal)

  return {
      props: { 
        obraNames: obraNames,
        personal: personal,
       }
  }
}

export default ObraAsistenciaPage