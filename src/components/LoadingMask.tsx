import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function LoadingMask() {
  return (
    <Box sx={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color="inherit" size={80}/>
    </Box>
  );
}
