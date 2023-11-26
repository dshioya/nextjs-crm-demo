'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import SignupForm from './SingupForm'
import styles from './page.module.css'

export default function SignupPage() {
  return (
    <Container fixed>
      <Box className={styles.box}>
        <SignupForm />
      </Box>
    </Container>
  )
}
