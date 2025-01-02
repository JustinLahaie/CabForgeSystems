import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import {
  Functions as FunctionsIcon,
  PlayArrow as PlayArrowIcon,
  Bookmark as BookmarkIcon
} from '@mui/icons-material'
import { useVariableLibrary } from './VariableLibraryContext'
import { validateFormula, FORMULA_PRESETS, MATH_FUNCTIONS } from './utils/formulaParser'

export default function FormulaPlayground() {
  const {
    systemVariables,
    getVariableValue
  } = useVariableLibrary()

  const [formula, setFormula] = useState(FORMULA_PRESETS[0].formula)
  const [result, setResult] = useState(null)
  const [validation, setValidation] = useState({ isValid: true, error: null })
  const [presetAnchor, setPresetAnchor] = useState(null)

  // Demo IDs for testing
  const DEMO_JOB_ID = '1'
  const DEMO_ROOM_ID = '10'
  const DEMO_CABINET_ID = '100'

  useEffect(() => {
    // Validate formula as user types
    const validationResult = validateFormula(formula, (name) => 
      getVariableValue(name, DEMO_JOB_ID, DEMO_ROOM_ID, DEMO_CABINET_ID)
    )
    setValidation(validationResult)

    // If valid, evaluate it
    if (validationResult.isValid) {
      try {
        const value = getVariableValue(formula, DEMO_JOB_ID, DEMO_ROOM_ID, DEMO_CABINET_ID)
        setResult(value)
      } catch (error) {
        setResult(null)
      }
    } else {
      setResult(null)
    }
  }, [formula])

  const handlePresetClick = (preset) => {
    setFormula(preset.formula)
    setPresetAnchor(null)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Formula Playground
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack spacing={3}>
          {/* Formula Input */}
          <Box>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<BookmarkIcon />}
                onClick={(e) => setPresetAnchor(e.currentTarget)}
              >
                Load Preset
              </Button>
              <Menu
                anchorEl={presetAnchor}
                open={Boolean(presetAnchor)}
                onClose={() => setPresetAnchor(null)}
              >
                {FORMULA_PRESETS.map((preset, index) => (
                  <MenuItem 
                    key={index}
                    onClick={() => handlePresetClick(preset)}
                  >
                    <ListItemIcon>
                      <FunctionsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={preset.name}
                      secondary={preset.description}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Stack>

            <TextField
              fullWidth
              label="Enter Formula"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              error={!validation.isValid}
              helperText={validation.error}
              sx={{ mb: 2 }}
            />

            {validation.isValid ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Formula is valid! Result: {result}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mb: 2 }}>
                {validation.error}
              </Alert>
            )}
          </Box>

          {/* Available Functions */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Available Functions
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {Object.keys(MATH_FUNCTIONS).map((func) => (
                <Chip
                  key={func}
                  icon={<FunctionsIcon />}
                  label={func}
                  variant="outlined"
                  onClick={() => setFormula(prev => `${func}(${prev})`)}
                />
              ))}
            </Stack>
          </Box>

          {/* Available Variables */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Available Variables
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Current Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(systemVariables).map(([name, variable]) => (
                    <TableRow key={name}>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => setFormula(prev => 
                            prev ? `${prev} + ${name}` : name
                          )}
                        >
                          {name}
                        </Button>
                      </TableCell>
                      <TableCell>{variable.description}</TableCell>
                      <TableCell>{variable.currentValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Paper>
    </Container>
  )
} 