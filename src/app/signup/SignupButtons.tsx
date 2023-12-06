'use client'

import {Box, Button} from '@mui/material'
import { useSession, signIn, signOut } from "next-auth/react"

import styles from './page.module.css'

export default function LoginButtons() {
  return (
    <Box className={styles.box}>
      <Button onClick={() => signIn("google")}>Googleサインアップ</Button>
    </Box>
  )
}
