import { ObraLayout } from "@/components/layouts"
import { dbUsers } from "@/database"
import { IUser } from "@/interfaces"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Typography } from '@mui/material';
import { getSession } from "next-auth/react";



interface Props {
    user: IUser
}


export const UserPage: NextPage<Props> = ({ user }) => {

  return (
    <>
      <ObraLayout
        title={`${ user.name + ' ' + user.lastName + '- Perfil' }`}
        pageDescription={"Editar perfil de usuario"}
      >

        <Typography>{ user.lastName }</Typography>

      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    
  const { legajo = '' } = query;
  const user = await dbUsers.getUsersByLegajo( legajo.toString() );

  if ( !user ) {
    
      return {
          redirect: {
              destination: '../auth/login',
              permanent: false
          }
      }
  }

  return {
      props: { 
        user: user
       }
  }
}

export default UserPage
