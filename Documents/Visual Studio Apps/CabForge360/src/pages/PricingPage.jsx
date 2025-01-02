import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Check as CheckIcon } from '@mui/icons-material'

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: 'Perfect for trying out CabForge360',
    features: [
      'Basic parametric design tools',
      '2D visualization',
      'Up to 3 projects',
      'Community support'
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined'
  },
  {
    title: 'Pro',
    subheader: 'Most Popular',
    price: '49',
    description: 'Everything you need for professional cabinet design',
    features: [
      'Advanced parametric design',
      '3D visualization & rendering',
      'Unlimited projects',
      'Variable library',
      'Priority support'
    ],
    buttonText: 'Start free trial',
    buttonVariant: 'contained'
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Custom solutions for large organizations',
    features: [
      'Custom integration options',
      'Advanced team management',
      'Dedicated support',
      'Custom training',
      'SLA guarantees'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined'
  }
]

export default function PricingPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 8 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Choose the perfect plan for your needs.
          All plans include core cabinet design features.
        </Typography>
      </Box>

      {/* Pricing Cards */}
      <Grid container spacing={4} alignItems="flex-end">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                sx={{
                  backgroundColor: 'background.paper'
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontStyle: 'italic' }}
                >
                  {tier.description}
                </Typography>
                <List>
                  {tier.features.map((feature) => (
                    <ListItem key={feature} sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button
                  component={RouterLink}
                  to="/login"
                  fullWidth
                  variant={tier.buttonVariant}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
} 