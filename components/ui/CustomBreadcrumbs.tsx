import { Link, Typography, Breadcrumbs } from '@mui/material'
import { useRouter } from 'next/router';

import React, { FC } from 'react'
import NextLink from 'next/link';

interface Props {
    references: {
        key: string,
        name: string | undefined; 
        link: string | undefined;
    }[]
  }

export const CustomBreadCrumbs: FC<Props> = ({references}) => {

    return (

        <>
            <div role="presentation" >
                <Breadcrumbs aria-label="breadcrumb"  sx={{ mb: 2 }}>
                    {
                        references.map( ref => (

                            <NextLink key={ ref.key } href={ ref.link ? ref.link : '#' } passHref legacyBehavior>
                                <Link color="inherit" underline="hover">
                                    { ref.name }
                                </Link>
                            </NextLink>
                        ))
                    }
                </Breadcrumbs>
            </div>
        </>

    )
}
