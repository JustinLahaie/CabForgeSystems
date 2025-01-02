import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  Box
} from '@mui/material'
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Notes as NotesIcon,
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Scene3D from './Scene3D'

export default function ClientDetailsScreen() {
  const { id: jobId } = useParams()
  const navigate = useNavigate()

  // In a real app, we'd fetch this from a backend
  // For now, we'll use placeholder data
  const client = {
    id: jobId,
    name: `Client #${jobId}`,
    email: 'client@example.com',
    phone: '(555) 123-4567',
    notes: 'Sample client notes and special instructions...'
  }

  // For demo purposes, we'll create room and cabinet IDs based on the job ID
  const roomId = `${jobId}0`
  const cabinetId = `${jobId}00`

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Back to Clients
        </Button>
        <Button
          component={Link}
          to="/variables"
          variant="outlined"
          startIcon={<SettingsIcon />}
        >
          Variable Library
        </Button>
      </Stack>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {client.name}
        </Typography>

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon color="action" />
            <Typography>{client.email}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon color="action" />
            <Typography>{client.phone}</Typography>
          </Box>

          {client.notes && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <NotesIcon color="action" />
              <Typography>{client.notes}</Typography>
            </Box>
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Cabinet Design
        </Typography>
        <Scene3D 
          jobId={jobId}
          roomId={roomId}
          cabinetId={cabinetId}
        />
      </Paper>
    </Container>
  )
} 