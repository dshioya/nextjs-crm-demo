'use client'

import {Box, Button} from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";

import styles from './page.module.css'

export default function LoginButtons() {
  const router = useRouter()

  function onClickSignUpButton() {
    router.push('/signup')
  }

  function onClickSignOutButton() {

  }

  return (
    <Box className={styles.box}>
      <Button variant='contained'
              onClick={() => signIn("google")}>Googleログイン</Button>
      <Button onClick={onClickSignUpButton}>アカウントを新規登録する</Button>
    </Box>
  )
}
