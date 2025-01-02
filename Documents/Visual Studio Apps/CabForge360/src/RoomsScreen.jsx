import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Box,
  IconButton
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewInAr as ViewInArIcon
} from '@mui/icons-material'

// Demo data (replace with actual data management)
const DEMO_CLIENT = {
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  phone: '(555) 123-4567',
  notes: 'Prefers modern design'
}

const DEMO_ROOMS = [
  { id: '1', name: 'Kitchen', width: 240, length: 180, notes: 'Main kitchen renovation' },
  { id: '2', name: 'Master Bath', width: 120, length: 96, notes: 'Vanity replacement' }
]

function AddRoomDialog({ open, onClose, onSave }) {
  const [room, setRoom] = useState({ name: '', width: '', length: '', notes: '' })
  const [errors, setErrors] = useState({})

  const validateRoom = () => {
    const newErrors = {}
    if (!room.name.trim()) newErrors.name = 'Name is required'
    if (!room.width) newErrors.width = 'Width is required'
    if (!room.length) newErrors.length = 'Length is required'
    if (room.width <= 0) newErrors.width = 'Width must be positive'
    if (room.length <= 0) newErrors.length = 'Length must be positive'
    if (room.width > 600) newErrors.width = 'Width cannot exceed 600 inches'
    if (room.length > 600) newErrors.length = 'Length cannot exceed 600 inches'
    return newErrors
  }

  const handleSave = () => {
    const newErrors = validateRoom()
    if (Object.keys(newErrors).length === 0) {
      onSave({
        ...room,
        width: Number(room.width),
        length: Number(room.length)
      })
      onClose()
      setRoom({ name: '', width: '', length: '', notes: '' })
      setErrors({})
    } else {
      setErrors(newErrors)
    }
  }

  const handleClose = () => {
    onClose()
    setRoom({ name: '', width: '', length: '', notes: '' })
    setErrors({})
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Room</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Room Name"
            value={room.name}
            onChange={(e) => {
              setRoom({ ...room, name: e.target.value })
              setErrors({ ...errors, name: '' })
            }}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Width (inches)"
                type="number"
                value={room.width}
                onChange={(e) => {
                  setRoom({ ...room, width: e.target.value })
                  setErrors({ ...errors, width: '' })
                }}
                required
                error={!!errors.width}
                helperText={errors.width}
                inputProps={{ min: 1, max: 600 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Length (inches)"
                type="number"
                value={room.length}
                onChange={(e) => {
                  setRoom({ ...room, length: e.target.value })
                  setErrors({ ...errors, length: '' })
                }}
                required
                error={!!errors.length}
                helperText={errors.length}
                inputProps={{ min: 1, max: 600 }}
              />
            </Grid>
          </Grid>
          <TextField
            label="Notes"
            multiline
            rows={3}
            value={room.notes}
            onChange={(e) => setRoom({ ...room, notes: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          disabled={!room.name || !room.width || !room.length}
        >
          Add Room
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function RoomsScreen() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [rooms, setRooms] = useState(DEMO_ROOMS)

  const handleAddRoom = (newRoom) => {
    const roomWithId = {
      ...newRoom,
      id: (rooms.length + 1).toString()
    }
    setRooms([...rooms, roomWithId])
  }

  const handleOpenRoom = (roomId) => {
    navigate(`/client/${clientId}/room/${roomId}`)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Client Info Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" gutterBottom>
              {DEMO_CLIENT.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Email: {DEMO_CLIENT.email}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Phone: {DEMO_CLIENT.phone}
            </Typography>
            {DEMO_CLIENT.notes && (
              <Typography variant="body1" color="text.secondary">
                Notes: {DEMO_CLIENT.notes}
              </Typography>
            )}
          </Box>
          <Button
            variant="outlined"
            onClick={() => navigate(`/client/${clientId}/variables`)}
          >
            Variable Library
          </Button>
        </Stack>
      </Paper>

      {/* Rooms Section */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
            Rooms
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Add Room
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {room.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dimensions: {room.width}" × {room.length}"
                  </Typography>
                  {room.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {room.notes}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<ViewInArIcon />}
                    onClick={() => handleOpenRoom(room.id)}
                  >
                    Open Room
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <AddRoomDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddRoom}
      />
    </Container>
  )
} 