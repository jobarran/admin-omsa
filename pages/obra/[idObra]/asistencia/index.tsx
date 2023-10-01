import { GetServerSideProps, NextPage } from "next"

import { Grid, Skeleton } from '@mui/material';

import { ObraLayout } from "@/components/layouts"
import { dbAsistencia, dbObras, dbPersonal } from "@/database"
import { useContext, useEffect, useState } from "react";
import { CustomBreadCrumbs } from '@/components/ui';
import dayjs, { Dayjs } from "dayjs";
import { AsistenciaDataGridLoading, AsistenciaDateCard, AsistenciaWeatherLoadingCard } from "@/components/Asistencia";
import { AsistenciaDataGrid } from "../../../../components/Asistencia";
import { adminObraApi } from "@/api";
import { usePersonal } from "@/hooks";
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
    asistencia: any
}

export const ObraAsistenciaPage: NextPage<Props> = ({ personal, obraNames, asistencia }) => {

  const [dayValue, setDayValue] = useState<Dayjs>(dayjs());
  const { activeObra } = useContext(UiContext)
  const [isMutating, setIsMutating] = useState(false)
  // const { data: dataAsistencia, error, isLoading, mutate } = useAsistencia(`/asistencia/${dayValue.format('YYYYMMDD').toString()}`)
  const { data: dataPersonal } = usePersonal(`/personal`)
  const [dataToGrid, setDataToGrid] = useState(asistencia)
  const [parte, setParte] = useState({ clima: asistencia.clima , montaje: asistencia.montaje , observaciones: asistencia.observaciones })

  const breadcrumbsRef = [
    { key: 'obra', name: activeObra?.name, link: `/obra/${activeObra?.idObra}` },
    { key: 'breadSecond', name: 'asistencia', link: undefined },
  ] 

  const onGetOrCreateAsistencia = async (newValue: any) => {

    const {data} = await adminObraApi.post(`/asistencia`, { 
      fecha: newValue.format('YYYYMMDD').toString(),
      asistenciaData: dataPersonal,
      clima: parte.clima,
      montaje: parte.montaje,
      observaciones: parte.observaciones
      });

    setParte({
      clima: data.clima,
      montaje: data.montaje,
      observaciones: data.observaciones
    })

    setDataToGrid(data)

  }

  const handleDayValueChange = (newValue: any) => {
    setDayValue(newValue)
    onGetOrCreateAsistencia(newValue)
  } 

  const handleParteChange = (newValue: any) => {
    setParte(prevState => ({
      ...prevState,
      [newValue.name]: newValue.value
    }))
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

    const updatePersonal = await adminObraApi.put(`/asistencia`, {
      fecha: dayValue.format('YYYYMMDD').toString(),
      data: dataPersonal
    })

    setDataToGrid(updatePersonal.data)
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
              !!dataToGrid  
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
              dataToGrid
              ?
              <AsistenciaDataGrid
                data={dataToGrid}
                onUpdateRow={onUpdateAsistenciaById}
                obraNames={obraNames}
                onUpdatePersonal={onUpdatePersonalList}
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
  const asistencia = await dbAsistencia.getOrCreateAsistencia(personal)


  return {
      props: { 
        obraNames: obraNames,
        personal: personal,
        asistencia: asistencia
       }
  }
}

export default ObraAsistenciaPage