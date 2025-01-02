import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from '@mui/material'

function ClientDialog({ open, onClose, onSave }) {
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const handleSave = () => {
    onSave(client)
    onClose()
    setClient({ name: '', email: '', phone: '', notes: '' })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Client</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Client Name"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
            required
          />
          <TextField
            label="Email Address"
            type="email"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
          <TextField
            label="Phone Number"
            value={client.phone}
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
          />
          <TextField
            label="Notes"
            multiline
            rows={3}
            value={client.notes}
            onChange={(e) => setClient({ ...client, notes: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          disabled={!client.name}
        >
          Add Client
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function ClientsScreen() {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [clients, setClients] = useState([
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '(555) 123-4567', notes: 'Prefers modern design' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', phone: '(555) 987-6543', notes: 'Traditional style' }
  ])

  const handleAddClient = (newClient) => {
    const clientWithId = {
      ...newClient,
      id: (clients.length + 1).toString()
    }
    setClients([...clients, clientWithId])
  }

  const handleOpenClient = (clientId) => {
    navigate(`/client/${clientId}/rooms`)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">
          Clients
        </Typography>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          Add Client
        </Button>
      </Stack>

      <Paper>
        <List>
          {clients.map((client) => (
            <ListItem key={client.id}>
              <ListItemText
                primary={client.name}
                secondary={
                  <>
                    {client.email && `Email: ${client.email}`}
                    {client.phone && ` • Phone: ${client.phone}`}
                    {client.notes && (
                      <Typography variant="body2" color="text.secondary">
                        {client.notes}
                      </Typography>
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenClient(client.id)}
                >
                  Open
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <ClientDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddClient}
      />
    </Container>
  )
} 