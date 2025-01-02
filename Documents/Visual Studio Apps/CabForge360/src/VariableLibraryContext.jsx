import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { evaluateFormula, checkCircularDependency } from './utils/formulaParser'

// Initial state with some example variables
const initialState = {
  systemVariables: {
    door_width: {
      name: 'door_width',
      description: 'Standard width for cabinet doors',
      defaultValue: 500,
      currentValue: 500,
      unit: 'mm'
    },
    toekick_height: {
      name: 'toekick_height',
      description: 'Height of cabinet toe kick',
      defaultValue: 100,
      currentValue: 100,
      unit: 'mm'
    }
  },
  jobVariables: {},
  roomVariables: {},
  cabinetVariables: {}
}

// Action types
const SET_SYSTEM_VARIABLE = 'SET_SYSTEM_VARIABLE'
const SET_JOB_VARIABLE = 'SET_JOB_VARIABLE'
const SET_ROOM_VARIABLE = 'SET_ROOM_VARIABLE'
const SET_CABINET_VARIABLE = 'SET_CABINET_VARIABLE'
const REMOVE_VARIABLE = 'REMOVE_VARIABLE'

// Reducer
function variableReducer(state, action) {
  switch (action.type) {
    case SET_SYSTEM_VARIABLE: {
      const { name, description, value, formula } = action.payload
      return {
        ...state,
        systemVariables: {
          ...state.systemVariables,
          [name]: {
            name,
            description,
            defaultValue: value,
            currentValue: value,
            formula,
            unit: 'mm'
          }
        }
      }
    }

    case SET_JOB_VARIABLE: {
      const { jobId, name, value, formula } = action.payload
      return {
        ...state,
        jobVariables: {
          ...state.jobVariables,
          [jobId]: {
            ...state.jobVariables[jobId],
            [name]: { value, formula }
          }
        }
      }
    }

    case SET_ROOM_VARIABLE: {
      const { roomId, name, value, formula } = action.payload
      return {
        ...state,
        roomVariables: {
          ...state.roomVariables,
          [roomId]: {
            ...state.roomVariables[roomId],
            [name]: { value, formula }
          }
        }
      }
    }

    case SET_CABINET_VARIABLE: {
      const { cabinetId, name, value, formula } = action.payload
      return {
        ...state,
        cabinetVariables: {
          ...state.cabinetVariables,
          [cabinetId]: {
            ...state.cabinetVariables[cabinetId],
            [name]: { value, formula }
          }
        }
      }
    }

    case REMOVE_VARIABLE: {
      const { level, id, name } = action.payload
      const newState = { ...state }

      switch (level) {
        case 'system':
          delete newState.systemVariables[name]
          break
        case 'job':
          if (newState.jobVariables[id]) {
            delete newState.jobVariables[id][name]
          }
          break
        case 'room':
          if (newState.roomVariables[id]) {
            delete newState.roomVariables[id][name]
          }
          break
        case 'cabinet':
          if (newState.cabinetVariables[id]) {
            delete newState.cabinetVariables[id][name]
          }
          break
        default:
          return state
      }
      return newState
    }

    default:
      return state
  }
}

// Create context
const VariableLibraryContext = createContext(null)

// Provider component
export function VariableLibraryProvider({ children }) {
  const [state, dispatch] = useReducer(variableReducer, initialState)

  const getVariableFormula = (variableName, jobId, roomId, cabinetId) => {
    // Check cabinet level
    if (cabinetId && 
        state.cabinetVariables[cabinetId] && 
        state.cabinetVariables[cabinetId][variableName]?.formula) {
      return state.cabinetVariables[cabinetId][variableName].formula
    }

    // Check room level
    if (roomId && 
        state.roomVariables[roomId] && 
        state.roomVariables[roomId][variableName]?.formula) {
      return state.roomVariables[roomId][variableName].formula
    }

    // Check job level
    if (jobId && 
        state.jobVariables[jobId] && 
        state.jobVariables[jobId][variableName]?.formula) {
      return state.jobVariables[jobId][variableName].formula
    }

    // Check system level
    if (state.systemVariables[variableName]?.formula) {
      return state.systemVariables[variableName].formula
    }

    return null
  }

  const getVariableValue = (variableName, jobId, roomId, cabinetId) => {
    const formula = getVariableFormula(variableName, jobId, roomId, cabinetId)
    
    if (formula) {
      try {
        // Check for circular dependencies
        if (checkCircularDependency(
          formula,
          variableName,
          (name) => getVariableFormula(name, jobId, roomId, cabinetId)
        )) {
          console.error(`Circular dependency detected for ${variableName}`)
          return 0
        }

        // Evaluate formula
        return evaluateFormula(formula, (name) => 
          getVariableValue(name, jobId, roomId, cabinetId)
        )
      } catch (error) {
        console.error(`Error evaluating formula for ${variableName}:`, error)
        return 0
      }
    }

    // If no formula, check for direct values
    // Check cabinet level
    if (cabinetId && 
        state.cabinetVariables[cabinetId] && 
        state.cabinetVariables[cabinetId][variableName]) {
      return state.cabinetVariables[cabinetId][variableName].value
    }

    // Check room level
    if (roomId && 
        state.roomVariables[roomId] && 
        state.roomVariables[roomId][variableName]) {
      return state.roomVariables[roomId][variableName].value
    }

    // Check job level
    if (jobId && 
        state.jobVariables[jobId] && 
        state.jobVariables[jobId][variableName]) {
      return state.jobVariables[jobId][variableName].value
    }

    // Fallback to system level
    if (state.systemVariables[variableName]) {
      return state.systemVariables[variableName].currentValue
    }

    return undefined
  }

  const setSystemVariable = (name, description, value, formula = null) => {
    dispatch({
      type: SET_SYSTEM_VARIABLE,
      payload: { name, description, value, formula }
    })
  }

  const setJobVariable = (jobId, name, value, formula = null) => {
    dispatch({
      type: SET_JOB_VARIABLE,
      payload: { jobId, name, value, formula }
    })
  }

  const setRoomVariable = (roomId, name, value, formula = null) => {
    dispatch({
      type: SET_ROOM_VARIABLE,
      payload: { roomId, name, value, formula }
    })
  }

  const setCabinetVariable = (cabinetId, name, value, formula = null) => {
    dispatch({
      type: SET_CABINET_VARIABLE,
      payload: { cabinetId, name, value, formula }
    })
  }

  const removeVariableOrOverride = (level, id, variableName) => {
    dispatch({
      type: REMOVE_VARIABLE,
      payload: { level, id, variableName }
    })
  }

  const value = {
    systemVariables: state.systemVariables,
    jobVariables: state.jobVariables,
    roomVariables: state.roomVariables,
    cabinetVariables: state.cabinetVariables,
    getVariableValue,
    getVariableFormula,
    setSystemVariable,
    setJobVariable,
    setRoomVariable,
    setCabinetVariable,
    removeVariableOrOverride
  }

  return (
    <VariableLibraryContext.Provider value={value}>
      {children}
    </VariableLibraryContext.Provider>
  )
}

VariableLibraryProvider.propTypes = {
  children: PropTypes.node.isRequired
}

// Custom hook
export function useVariableLibrary() {
  const context = useContext(VariableLibraryContext)
  if (!context) {
    throw new Error('useVariableLibrary must be used within a VariableLibraryProvider')
  }
  return context
} 