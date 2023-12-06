'use client'

import {Box, Container, Typography} from '@mui/material'
import LoginButtons from './LoginButtons'
import {SessionProvider, useSession} from 'next-auth/react'
import {redirect} from 'next/navigation'
import LoadingMask from "@/components/LoadingMask";

export default function Home() {
  return (
    <SessionProvider>
      <PageContent />
    </SessionProvider>
  )
}

function PageContent() {
  const {data: session, status} = useSession()

  if (status == 'loading') {
    return (
      <LoadingMask/>
    )
  }

  if (session?.user) {
    redirect('/customer/list')
    return
  }

  return (
    <Box sx={{
      pt: 8,
      pb: 6,
    }}>
      <Container>
        <Typography component="h1"
                    variant="h2"
                    align="center"
                    gutterBottom>顧客管理システム(デモ)</Typography>
        <Typography variant="h5"
                    align="center">これは顧客管理システムのデモ画面です。Next.jsの学習の目的で作成しています。</Typography>
        <LoginButtons />
      </Container>
    </Box>
  )
}
