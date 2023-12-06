'use client'

import {createTheme} from '@mui/material/styles'

export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none'
        }
      }
    }
  }
})
