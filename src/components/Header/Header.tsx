import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'

const Header = () => {
  console.log('Header has been called')

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6">
          Todo
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header