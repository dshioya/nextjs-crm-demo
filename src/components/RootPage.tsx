'use client'

import {ReactNode} from 'react';
import {Box, Toolbar} from '@mui/material';
import {useSession} from 'next-auth/react'

export default function RootPage({children}: { children: ReactNode }) {
  const {status} = useSession()

  const isLoading = status === 'loading'

  return (
    <>
      <Toolbar />
      {!isLoading && <Box>{children}</Box>}
    </>
  )
}
