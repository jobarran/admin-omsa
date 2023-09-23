
import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Skeleton } from '@mui/material';

import { ObraLayout } from "@/components/layouts"
import { useContext } from "react";
import { CustomBreadCrumbs } from '@/components/ui';
import { UiContext } from "@/context";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import { OmDataGrid } from "@/components/Om";
import { NextPage } from 'next';



const ObraOmPage: NextPage = () => {

  const { activeObra } = useContext(UiContext)


  const breadcrumbsRef = [
    { key: 'obra', name: activeObra?.name, link: `/obra/${activeObra?.idObra}` },
  ] 

  

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
          
            <OmDataGrid
            data={[ 'asd0', 'dasdas']}
          />

        </Grid>

      </ObraLayout>
    </>
  )
}

export default ObraOmPage