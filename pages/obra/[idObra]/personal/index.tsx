import { ObraLayout } from "@/components/layouts"
import { dbObras, dbPersonal, dbUsers } from "@/database"
import { IObra, IUser } from "@/interfaces"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { CustomBreadCrumbs } from "@/components/ui";
import { useContext, useEffect } from "react";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import { usePersonal } from "@/hooks";
import { ObraPersonalTable, ObraPersonalTableLoading } from "@/components/Personal";
import React from "react";
import { UiContext } from "@/context";
import { personalInObra } from '../../../../utils/personalInObra';
import { personalInObraByRol } from "@/utils";



interface Props {
    obra: IObra,
    obraNames: {
      idObra: string,
      name  : string
    }[],
}


export const ObraPersonalPage: NextPage<Props> = ({ obra, obraNames }) => {

  const [isMutating, setIsMutating] = React.useState(false)
  const { data, error, isLoading, mutate } = usePersonal(`/personal`)
  const { activeObra } = useContext(UiContext)

  const breadcrumbsRef = [
    { key: 'obra', name: activeObra?.name, link: `/obra/${activeObra?.idObra}` },
    { key: 'breadSecond', name: 'Personal', link: undefined },
  ]

  useEffect(() => {
    mutate()
  }, [isMutating])
  

  return (
    <>
      <ObraLayout
        title={`${ activeObra?.name + ' - Personal'}`}
        pageDescription={"Personal"}
      >
        {
          !!activeObra
          ? <CustomBreadCrumbs references={ breadcrumbsRef }/>
          : <Skeleton animation="wave" variant="rounded" width={250} height={25} sx={{  bgcolor: 'grey.100', mt:2, mb:2 }}/>
        }

        <Grid container spacing={2}>
          
          <Grid container item spacing={2} xs={12} >

            <Grid item xs={12}>
              <Card sx={{ boxShadow: 0, }}>

                <CardContent>
                  
                  <Grid container>

                    <div style={{ width: '100%' }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: "center",
                        justifyContent: 'space-between',
                        mt:1
                      }}>

                        <Box></Box>

                        <Box>
                          <Typography color='primary' variant="h4">
                            {personalInObra(activeObra?.idObra, data)}</Typography>
                          <Typography color='primary' variant="body2">Total</Typography>
                        </Box>

                        <Divider sx={{ m:1 }} orientation="vertical" flexItem />

                        <Box>
                          <Typography variant="h4">
                            {personalInObraByRol(activeObra?.idObra, data, 'Capataz')}
                          </Typography>
                          <Typography variant="body2">Capataz</Typography>
                        </Box>

                        <Divider sx={{ m:1 }}  orientation="vertical" flexItem />

                        <Box>
                          <Typography variant="h4">{personalInObraByRol(activeObra?.idObra, data, 'HyS')}</Typography>
                          <Typography variant="body2">HyS</Typography>
                        </Box>

                        <Divider sx={{ m:1 }}  orientation="vertical" flexItem />

                        <Box>
                          <Typography variant="h4">
                            {
                              personalInObra(activeObra?.idObra, data)
                              -personalInObraByRol(activeObra?.idObra, data, 'Capataz')
                              -personalInObraByRol(activeObra?.idObra, data, 'HyS')
                            }
                          </Typography>
                          <Typography variant="body2">Operarios</Typography>
                        </Box>

                        <Box></Box>

                      </Box>
                    </div>
                      
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            

          </Grid>

          <Grid container item spacing={2} xs={12} lg={12}>

          {
              data && !isLoading
              ?
              <ObraPersonalTable
                data={data}
                obraNames={obraNames}
                setIsMutating={setIsMutating}
              />   
              : <ObraPersonalTableLoading /> 
          }

                            
          </Grid>

      </Grid>


      </ObraLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
  const { idObra } = params as { idObra: string }

  const obra = await dbObras.getObrasById( idObra.toString() );
  const obraNames = await dbObras.getAllObras();


  return {
      props: { 
        obra: obra,
        obraNames: obraNames
       }
  }
}
  

export default ObraPersonalPage