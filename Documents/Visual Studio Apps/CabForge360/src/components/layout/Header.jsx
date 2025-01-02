import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material'

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
              fontWeight: 700
            }}
          >
            CabForge360
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={RouterLink} to="/features" color="inherit">
              Features
            </Button>
            <Button component={RouterLink} to="/pricing" color="inherit">
              Pricing
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
} 