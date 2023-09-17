import { ObraLayout } from "@/components/layouts"
import { dbObras, dbUsers } from "@/database"
import { IObra, IUser } from "@/interfaces"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Typography } from '@mui/material';
import { CustomBreadCrumbs } from "@/components/ui";



interface Props {
    obra: IObra
}


export const ObraAvancePage: NextPage<Props> = ({ obra }) => {

  const breadcrumbsRef = [
    { key: 'obra', name: obra.name, link: `/obra/${obra.idObra}` },
    { key: 'breadSecond', name: 'Avance', link: undefined },
  ]

  return (
    <>
      <ObraLayout
        title={`${ obra.name + ' - ' + obra.idObra }`}
        pageDescription={"Admin"}
      >

        <CustomBreadCrumbs
          references={ breadcrumbsRef }
        />

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
  

export default ObraAvancePage