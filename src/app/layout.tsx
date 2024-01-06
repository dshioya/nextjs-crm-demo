import type {Metadata} from 'next'
import {Roboto} from 'next/font/google'
import {SnackbarProvider} from '@/components/snackbar/SnackbarProvider'
import {ThemeProvider} from '@mui/material/styles'
import RootPage from '@/components/RootPage'
import currentTheme from './theme'

import './globals.css'

const font = Roboto({weight: '400', subsets: ['latin']})

export const metadata: Metadata = {
  title: '顧客管理システム(デモ版)',
  description: '顧客管理システムのデモ画面',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={currentTheme}>
      <html lang="en">
        <body className={font.className}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </body>
      </html>
    </ThemeProvider>
  )
}
