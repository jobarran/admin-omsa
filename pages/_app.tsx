import { UiProvider } from '@/context'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from '@/context/auth'
import { SWRConfig } from 'swr'



export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  return (
    <SessionProvider session={ pageProps.session }  >
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <ThemeProvider theme={ lightTheme }>
            <CssBaseline/>
              <UiProvider>
                  <Component {...pageProps}/>
              </UiProvider>
          </ThemeProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

