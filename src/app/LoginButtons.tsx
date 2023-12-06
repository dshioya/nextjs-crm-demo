'use client'

import {Button, Stack} from '@mui/material'
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButtons() {
  return (
    <Stack sx={{ pt: 4 }}
           spacing={2}
           alignItems="center">
      <Button variant="contained"
              onClick={() => signIn('google')}>Googleアカウントで試す</Button>
    </Stack>
  )
}
