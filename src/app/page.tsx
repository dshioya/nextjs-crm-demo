import {Box, Button, Container, Stack, Typography} from '@mui/material'
import LoginButtons from './LoginButtons';
import { SessionProvider } from 'next-auth/react'

export default function Home() {
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
        <LoginButtons/>
      </Container>
    </Box>
  )
}
