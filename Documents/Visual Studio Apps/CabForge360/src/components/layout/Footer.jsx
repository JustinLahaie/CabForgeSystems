import { Box, Container, Typography, Link } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          <Link color="inherit" href="/">
            CabForge360
          </Link>{' '}
          {new Date().getFullYear()}
          {' • '}
          <Link color="inherit" href="/privacy">
            Privacy
          </Link>
          {' • '}
          <Link color="inherit" href="/terms">
            Terms
          </Link>
        </Typography>
      </Container>
    </Box>
  )
} 