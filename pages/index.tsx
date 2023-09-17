import { Inter } from 'next/font/google'
import { ObraLayout } from '@/components/layouts'
import { FullScreenLoading } from '@/components/ui'
import { useObras } from '@/hooks'
import { ObraList } from '@/components/Obras/ObraList'
import { DashboardObraCardList, DashboardOptionsList } from '@/components/Dashboard'
import { DashboardData } from '../components/Dashboard/DashboardData';
import { useContext } from 'react'
import { AuthContext } from '@/context/auth'

const inter = Inter({ subsets: ['latin'] })
const obras = ['Campos Salles', 'Qiub', 'Lipa', 'Vilo']

export default function Home() {

  const { obras, error, isLoading } = useObras('/obras')
  const { user } = useContext( AuthContext )  


  return (
    <>
      <ObraLayout
        title={"Obra Admin"}
        pageDescription={"Administrador de obra"}
      >
      {
        isLoading
        ? <FullScreenLoading />
        : <>
            <DashboardObraCardList obras={ obras } />
            {
              user?.role === 'admin'
                ? <>
                  <DashboardOptionsList />
                  <DashboardData /> 
                  </>
                : <></>
            }
          </>
      }

      </ObraLayout>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
//   const session = await getSession({ req });

//   if ( !session ) {
//       return {
//           redirect: {
//               destination: 'auth/login',
//               permanent: false
//           }
//       }
//   }

//   return {
//       props: { }
//   }
// }