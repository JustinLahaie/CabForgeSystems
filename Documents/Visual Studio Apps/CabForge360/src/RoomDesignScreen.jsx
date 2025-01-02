import { useParams } from 'react-router-dom'
import { Container, Typography, Paper } from '@mui/material'

export default function RoomDesignScreen() {
  const { clientId, roomId } = useParams()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Room Design
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Client ID: {clientId}, Room ID: {roomId}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Room design tools coming soon...
        </Typography>
      </Paper>
    </Container>
  )
} 