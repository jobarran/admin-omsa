import { ObraLayout } from "@/components/layouts"
import { dbObras, dbUsers } from "@/database"
import { IObra, IUser } from "@/interfaces"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Typography } from '@mui/material';



interface Props {
    obra: IObra
}


export const ObraPage: NextPage<Props> = ({ obra }) => {

  return (
    <>
      <ObraLayout
        title={`${ obra.name + ' - ' + obra.idObra }`}
        pageDescription={"Admin"}
      >

        <Typography>{ obra.name }</Typography>

      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
  const { idObra } = params as { idObra: string }

  const obra = await dbObras.getObrasById( idObra.toString() );

  if ( !obra ) {
    return {
      redirect: {
          destination: '/',
          permanent: false
      }
    }
  }

  return {
      props: { 
        obra: obra
       }
  }
}
  

export default ObraPage