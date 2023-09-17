import { ObraLayout } from "@/components/layouts"
import { dbObras, dbUsers } from "@/database"
import { IObra, IUser } from "@/interfaces"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Typography } from '@mui/material';



interface Props {
    obra: IObra
}


export const ObraEquiposPage: NextPage<Props> = ({ obra }) => {

  return (
    <>
      <ObraLayout
        title={`${ obra.name + ' - ' + obra.idObra }`}
        pageDescription={"Admin"}
      >

        <Typography>{ obra.name } - Equipos</Typography>

      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
  const { idObra } = params as { idObra: string }

  const obra = await dbObras.getObrasById( idObra.toString() );

  return {
      props: { 
        obra: obra
       }
  }
}
  

export default ObraEquiposPage