import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LoginForm from './LoginForm'

import styles from './page.module.css'

export default function LoginPage() {
  return (
    <Container fixed>
      <Box className={styles.box}>
        <LoginForm />
      </Box>
    </Container>
  )
}
