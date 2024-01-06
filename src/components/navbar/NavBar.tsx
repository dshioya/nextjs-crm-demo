'use client'

import {useState, MouseEvent} from 'react'
import {AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem} from '@mui/material';
import {AccountCircle} from '@mui/icons-material'
import {signOut} from 'next-auth/react'

export default function NavBar({title}: { title: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isAccountMenuOpen = Boolean(anchorEl);
  const accountMenuId = 'account-menu'

  function onClickAccountMenu(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function onCloseAccountMenu() {
    setAnchorEl(null);
  }

  async function onClickSignOutMenu() {
    await signOut()
  }

  return (
    <Box>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>{title}</Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={accountMenuId}
            aria-haspopup="true"
            onClick={onClickAccountMenu}
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            id={accountMenuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isAccountMenuOpen}
            onClose={onCloseAccountMenu}
      >
        <MenuItem>プロフィール</MenuItem>
        <MenuItem onClick={onClickSignOutMenu}>ログアウト</MenuItem>
      </Menu>
    </Box>
  )
}
