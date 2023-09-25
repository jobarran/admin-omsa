import { useContext } from "react";
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router";

import {  Grid } from '@mui/material';

import { dbPersonal } from "@/database"
import { IPersonal } from "@/interfaces"
import { UiContext } from "@/context";

import { ObraLayout } from "@/components/layouts"
import { CustomBreadCrumbs } from "@/components/ui";
import { PersonalInfoCard, PersonalTagsCard, PersonalStarsCard, PersonalCommentCard } from '@/components/Personal';

import { capitalize } from "@/utils";

interface Props {
  personal: IPersonal
}


export const UserPage: NextPage<Props> = ({ personal }) => {

  const { activeObra } = useContext( UiContext )
  const router = useRouter()

  const breadcrumbsRef = [
    { key: 'obra', name: activeObra?.name, link: `/obra/${activeObra?.idObra}` },
    { key: 'breadSecond', name: capitalize(router.asPath.split('/')[1]) , link: `/obra/${activeObra?.idObra}/${router.asPath.split('/')[1]}` },
    { key: 'breadThird', name: `${personal.name} ${personal.lastName}`, link: undefined }
  ]

  return (
    <>
      <ObraLayout
        title={`${ personal.name } ${ personal.lastName } - Perfil`}
        pageDescription={"Editar perfil de usuario"}
      >

        <CustomBreadCrumbs references={ breadcrumbsRef }/>

        <Grid container spacing={2}>
            <Grid container item spacing={2} xs={12} md={4}>
            <PersonalInfoCard personal={personal} />
            <PersonalTagsCard personal={personal} />
        </Grid>

        <Grid container item spacing={2} xs={12} md={8}>
          <PersonalStarsCard name={"Asistencia"} value={3} />  
          <PersonalStarsCard name={"Actitud"} value={2} />
          <PersonalStarsCard name={"Conocimiento"} value={5} />
          <PersonalCommentCard />
        </Grid>


      </Grid>

      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    
  const { legajo = '' } = query;
  const personal = await dbPersonal.getPersonalByLegajo( legajo.toString() );
  if ( !personal ) {
    
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }

  return {
      props: { 
        personal: personal
       }
  }
}
  
  
export default UserPage
