'use client'

import {createContext, useContext, useState, Fragment, ReactNode, SyntheticEvent} from 'react'
import {Alert, IconButton, Snackbar} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export type SnackbarParams = {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface ISnackbarContext {
  showMessage: ((params: SnackbarParams) => void);
}

const SnackbarContext = createContext<ISnackbarContext>({
  showMessage: (params: SnackbarParams) => {}
});

export function useSnackbarContext() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({children}: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<'success' | 'info' | 'warning' | 'error'>('success')
  const [message, setMessage] = useState<string>('')
  const [key, setKey] = useState<number>(0)

  const action = (
    <IconButton aria-label="close">
      <CloseIcon />
    </IconButton>
  )

  function onClose(event: SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false)
    setType('success')
    setMessage('')
  }

  function showMessage(options: SnackbarParams) {
    setKey(new Date().getTime())
    setType(options.type)
    setMessage(options.message)
    setOpen(true)
  }

  return (
    <Fragment>
      <SnackbarContext.Provider value={{showMessage}}>{children}</SnackbarContext.Provider>
      <Snackbar open={open}
                key={key}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={3000}
                transitionDuration={{ enter: 300, exit: 0 }}
                onClose={onClose}>
        <Alert severity={type}
               onClose={onClose}>{message}</Alert>
      </Snackbar>
    </Fragment>
  )
}

