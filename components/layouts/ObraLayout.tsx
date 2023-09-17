import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar, SideMenu } from "../ui";


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ObraLayout:FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, imageFullUrl }) => {

  return (

    <>
    
        <Head>
            <title>{ title }</title>
            {/* Para buscadores */}
            <meta name="description" content={ pageDescription } />
            {/* Para compartir en redes sociales */}
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />
            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }
        </Head>

        <nav>
            <Navbar />
        </nav>

        <SideMenu/>

        <main style={{
            margin: '80px auto',
            maxWidth: 'auto',
            padding: '0px 30px'
        }}
        >
            {children}
        </main>

        <footer>
            {/* TODO: custom footer */}
        </footer>

    </>

  )
}
