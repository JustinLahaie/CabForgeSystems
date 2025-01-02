import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper
} from '@mui/material'
import {
  Architecture as ArchitectureIcon,
  ViewInAr as ViewInArIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'

const features = [
  {
    icon: <ArchitectureIcon sx={{ fontSize: 40 }} />,
    title: 'Parametric Design',
    description: 'Create custom cabinets with dynamic, adjustable parameters.'
  },
  {
    icon: <ViewInArIcon sx={{ fontSize: 40 }} />,
    title: '3D Visualization',
    description: 'View your designs in real-time with our advanced 3D renderer.'
  },
  {
    icon: <SettingsIcon sx={{ fontSize: 40 }} />,
    title: 'Variable Library',
    description: 'Manage and reuse design variables across multiple projects.'
  }
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            CabForge360
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Parametric cabinet design and manufacturing software that puts you in control.
            Design, visualize, and export your custom cabinets with precision and ease.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/features"
              variant="contained"
              size="large"
            >
              Explore Features
            </Button>
            <Button
              component={RouterLink}
              to="/pricing"
              variant="outlined"
              size="large"
            >
              View Pricing
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Overview */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
} 