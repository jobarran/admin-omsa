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
  
  

// //* Use getStaticPaths if you are statically pre-rendering pages that use dynamic routes
// export const getStaticPaths: GetStaticPaths = async (ctx) => {

//   const userLegajos = await dbUsers.getAllUserLegajo();

//   return  {

//     paths: userLegajos.map( ({ legajo }) => ({
//       params: {
//         legajo
//       }
//     })),
//     fallback: 'blocking',
//   };

// }

// //* Get the proprs from API en tiempo de BUILD
// export const getStaticProps: GetStaticProps = async ({ params }) => {


//   const { legajo = '' } = params as { legajo: string }
//   const user = await dbUsers.getUsersByLegajo( legajo );
  
  
//   if ( !user ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {

//     props: {
//       user
//     },
//     revalidate: 86400 // en segundos

//   }
// }

export default UserPage
