import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Box,
  FormControlLabel,
  Switch,
  Tooltip,
  Alert
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Functions as FunctionsIcon,
  Science as ScienceIcon
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useVariableLibrary } from './VariableLibraryContext'
import { isSafeFormula, validateFormula, FORMULA_PRESETS } from './utils/formulaParser'

// Demo IDs for testing
const DEMO_JOB_ID = '1'
const DEMO_ROOM_ID = '10'
const DEMO_CABINET_ID = '100'

function VariableDialog({ open, onClose, onSave, initialData = {} }) {
  const { getVariableValue } = useVariableLibrary()
  const [variable, setVariable] = useState(initialData)
  const [useFormula, setUseFormula] = useState(!!initialData.formula)
  const [validation, setValidation] = useState({ isValid: true, error: null })

  useEffect(() => {
    if (useFormula && variable.formula) {
      const result = validateFormula(variable.formula, (name) =>
        getVariableValue(name, DEMO_JOB_ID, DEMO_ROOM_ID, DEMO_CABINET_ID)
      )
      setValidation(result)
    } else {
      setValidation({ isValid: true, error: null })
    }
  }, [variable.formula, useFormula])

  const handleSave = () => {
    if (useFormula) {
      if (!validation.isValid) {
        return
      }
      onSave({
        ...variable,
        value: null,
        formula: variable.formula
      })
    } else {
      onSave({
        ...variable,
        value: Number(variable.value),
        formula: null
      })
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData.name ? 'Edit Variable' : 'Add Variable'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Name"
            value={variable.name || ''}
            onChange={(e) => setVariable({ ...variable, name: e.target.value })}
            required
          />
          <TextField
            label="Description"
            value={variable.description || ''}
            onChange={(e) => setVariable({ ...variable, description: e.target.value })}
            multiline
            rows={2}
          />
          <FormControlLabel
            control={
              <Switch
                checked={useFormula}
                onChange={(e) => setUseFormula(e.target.checked)}
              />
            }
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <FunctionsIcon />
                <span>Use Formula</span>
              </Stack>
            }
          />
          {useFormula ? (
            <>
              <TextField
                label="Formula"
                value={variable.formula || ''}
                onChange={(e) => {
                  setVariable({ ...variable, formula: e.target.value })
                }}
                required
                error={!validation.isValid}
                helperText={validation.error || 'Example: cabinet_width / 2 + 10'}
              />
              <Box>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  Need help with formulas?
                </Typography>
                <Button
                  component={Link}
                  to="/formula-playground"
                  startIcon={<ScienceIcon />}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  Try Formula Playground
                </Button>
              </Box>
            </>
          ) : (
            <TextField
              label="Value"
              type="number"
              value={variable.value || ''}
              onChange={(e) => setVariable({ ...variable, value: Number(e.target.value) })}
              required
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={!variable.name?.trim() || (useFormula ? !validation.isValid : !variable.value)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function VariableLibraryScreen() {
  const {
    systemVariables,
    jobVariables,
    roomVariables,
    cabinetVariables,
    setSystemVariable,
    setJobVariable,
    setRoomVariable,
    setCabinetVariable,
    removeVariableOrOverride,
    getVariableValue,
    getVariableFormula
  } = useVariableLibrary()

  const [currentTab, setCurrentTab] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingVariable, setEditingVariable] = useState(null)

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  const handleAddVariable = () => {
    setEditingVariable(null)
    setDialogOpen(true)
  }

  const handleEditVariable = (variable) => {
    setEditingVariable(variable)
    setDialogOpen(true)
  }

  const handleSaveVariable = (variable) => {
    switch (currentTab) {
      case 0: // System
        setSystemVariable(variable.name, variable.description, variable.value, variable.formula)
        break
      case 1: // Job
        setJobVariable(DEMO_JOB_ID, variable.name, variable.value, variable.formula)
        break
      case 2: // Room
        setRoomVariable(DEMO_ROOM_ID, variable.name, variable.value, variable.formula)
        break
      case 3: // Cabinet
        setCabinetVariable(DEMO_CABINET_ID, variable.name, variable.value, variable.formula)
        break
    }
  }

  const handleDeleteVariable = (name, level, id) => {
    removeVariableOrOverride(level, id, name)
  }

  const renderVariableTable = (variables, level, id) => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Formula/Value</TableCell>
            <TableCell>Current Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(variables).map(([name, variable]) => {
            const formula = getVariableFormula(name, DEMO_JOB_ID, DEMO_ROOM_ID, DEMO_CABINET_ID)
            const currentValue = getVariableValue(name, DEMO_JOB_ID, DEMO_ROOM_ID, DEMO_CABINET_ID)

            return (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell>{variable.description}</TableCell>
                <TableCell>
                  {formula ? (
                    <Tooltip title="Formula">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <FunctionsIcon fontSize="small" />
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {formula}
                        </Typography>
                      </Stack>
                    </Tooltip>
                  ) : (
                    level === 'system' ? variable.currentValue : variable.value
                  )}
                </TableCell>
                <TableCell>
                  {currentValue}
                  {variable.unit && ` ${variable.unit}`}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditVariable(variable)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteVariable(name, level, id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">
          Variable Library
        </Typography>
        <Button
          component={Link}
          to="/formula-playground"
          variant="outlined"
          startIcon={<ScienceIcon />}
        >
          Formula Playground
        </Button>
      </Stack>

      <Paper sx={{ mb: 4 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="System Variables" />
          <Tab label="Job Variables" />
          <Tab label="Room Variables" />
          <Tab label="Cabinet Variables" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddVariable}
          >
            Add Variable
          </Button>
        </Box>

        {currentTab === 0 && renderVariableTable(systemVariables, 'system')}
        {currentTab === 1 && renderVariableTable(jobVariables[DEMO_JOB_ID] || {}, 'job', DEMO_JOB_ID)}
        {currentTab === 2 && renderVariableTable(roomVariables[DEMO_ROOM_ID] || {}, 'room', DEMO_ROOM_ID)}
        {currentTab === 3 && renderVariableTable(cabinetVariables[DEMO_CABINET_ID] || {}, 'cabinet', DEMO_CABINET_ID)}
      </Paper>

      <VariableDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveVariable}
        initialData={editingVariable}
      />
    </Container>
  )
} 