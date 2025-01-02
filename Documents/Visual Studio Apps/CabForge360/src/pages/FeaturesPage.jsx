import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box
} from '@mui/material'
import {
  Architecture as ArchitectureIcon,
  ViewInAr as ViewInArIcon,
  Settings as SettingsIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Build as BuildIcon
} from '@mui/icons-material'

const features = [
  {
    title: 'Parametric Design',
    description: 'Create custom cabinets with dynamic, adjustable parameters. Our powerful parametric engine allows you to define relationships between dimensions and automatically updates your designs.',
    icon: <ArchitectureIcon sx={{ fontSize: 60 }} />,
    color: '#2196f3'
  },
  {
    title: '3D Visualization',
    description: 'View your designs in real-time with our advanced 3D renderer. Rotate, zoom, and inspect your cabinets from any angle to ensure perfect design alignment.',
    icon: <ViewInArIcon sx={{ fontSize: 60 }} />,
    color: '#4caf50'
  },
  {
    title: 'Variable Library',
    description: 'Manage and reuse design variables across multiple projects. Create templates and standards that can be easily applied to new designs.',
    icon: <SettingsIcon sx={{ fontSize: 60 }} />,
    color: '#ff9800'
  },
  {
    title: 'Real-time Updates',
    description: 'See changes instantly as you modify parameters. Our efficient update system ensures smooth performance even with complex designs.',
    icon: <SpeedIcon sx={{ fontSize: 60 }} />,
    color: '#e91e63'
  },
  {
    title: 'Project Management',
    description: 'Organize your work with our comprehensive project management system. Keep track of clients, rooms, and individual cabinet designs.',
    icon: <StorageIcon sx={{ fontSize: 60 }} />,
    color: '#9c27b0'
  },
  {
    title: 'Manufacturing Ready',
    description: 'Export your designs directly to manufacturing formats. Generate cut lists, assembly instructions, and CNC-ready files.',
    icon: <BuildIcon sx={{ fontSize: 60 }} />,
    color: '#607d8b'
  }
]

export default function FeaturesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
        >
          Features
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          Discover the powerful features that make CabForge360 the perfect tool for
          professional cabinet design and manufacturing.
        </Typography>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Start Designing Now
        </Button>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item key={feature.title} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'background.paper'
                }}
              >
                <Box sx={{ color: feature.color }}>
                  {feature.icon}
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Ready to get started?
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Join thousands of professionals who trust CabForge360 for their cabinet
          design needs.
        </Typography>
        <Button
          component={RouterLink}
          to="/pricing"
          variant="outlined"
          size="large"
          sx={{ mt: 2 }}
        >
          View Pricing Plans
        </Button>
      </Box>
    </Container>
  )
} 