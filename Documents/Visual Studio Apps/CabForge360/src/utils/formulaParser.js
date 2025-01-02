// Set of allowed operators for basic arithmetic
const ALLOWED_OPERATORS = new Set(['+', '-', '*', '/', '(', ')', '.', ','])

// Available math functions
const MATH_FUNCTIONS = {
  min: Math.min,
  max: Math.max,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
  abs: Math.abs
}

// Formula presets for common calculations
export const FORMULA_PRESETS = [
  {
    name: 'Half Width',
    formula: 'cabinet_width / 2',
    description: 'Calculate half of the cabinet width'
  },
  {
    name: 'Maximum Width',
    formula: 'min(cabinet_width, 450)',
    description: 'Limit cabinet width to 450 units'
  },
  {
    name: 'Rounded Height',
    formula: 'round(cabinet_height)',
    description: 'Round the cabinet height to nearest unit'
  },
  {
    name: '120% Depth',
    formula: 'round(cabinet_depth * 1.2)',
    description: 'Increase depth by 20% and round'
  }
]

// Check if a formula is safe to evaluate
function isSafeFormula(formula) {
  if (!formula) return false

  // Check for balanced parentheses
  let parenCount = 0
  for (const char of formula) {
    if (char === '(') parenCount++
    if (char === ')') parenCount--
    if (parenCount < 0) return false
  }
  if (parenCount !== 0) return false

  // Remove whitespace and check each character
  return formula.replace(/\s/g, '').split('').every(char => {
    return (
      ALLOWED_OPERATORS.has(char) ||     // Operator
      /[\d]/.test(char) ||              // Number
      /[a-zA-Z_]/.test(char)            // Variable name or function
    )
  })
}

// Extract variable names from a formula
function extractVariableNames(formula) {
  // Exclude function names from variable matches
  const functionNames = Object.keys(MATH_FUNCTIONS)
  const variableRegex = new RegExp(
    `\\b(?!(?:${functionNames.join('|')})\\b)[a-zA-Z_][a-zA-Z0-9_]*\\b`,
    'g'
  )
  return formula.match(variableRegex) || []
}

// Validate formula and return detailed result
export function validateFormula(formula, getVariableValue) {
  if (!formula) {
    return { isValid: false, error: 'Formula is empty' }
  }

  if (!isSafeFormula(formula)) {
    return { isValid: false, error: 'Formula contains invalid characters or unbalanced parentheses' }
  }

  try {
    // Test evaluation with the current variables
    evaluateFormula(formula, getVariableValue)
    return { isValid: true, error: null }
  } catch (error) {
    return { isValid: false, error: error.message }
  }
}

// Check for circular dependencies
function checkCircularDependency(
  formula,
  variableName,
  getVariableFormula,
  visited = new Set()
) {
  if (visited.has(variableName)) {
    return true // Circular dependency found
  }

  visited.add(variableName)
  const variables = extractVariableNames(formula)

  for (const varName of variables) {
    const dependentFormula = getVariableFormula(varName)
    if (dependentFormula) {
      if (checkCircularDependency(dependentFormula, varName, getVariableFormula, visited)) {
        return true
      }
    }
  }

  visited.delete(variableName)
  return false
}

// Evaluate a formula with variable resolution
function evaluateFormula(formula, getVariableValue) {
  if (!formula || !isSafeFormula(formula)) {
    throw new Error('Invalid or unsafe formula')
  }

  // First, replace function calls
  let processedFormula = formula
  Object.keys(MATH_FUNCTIONS).forEach(funcName => {
    const regex = new RegExp(`${funcName}\\s*\\(([^)]+)\\)`, 'g')
    processedFormula = processedFormula.replace(regex, (match, args) => {
      // Evaluate the arguments
      const evaluatedArgs = args.split(',').map(arg => {
        const trimmedArg = arg.trim()
        // Check if the argument is a number
        if (/^-?\d*\.?\d+$/.test(trimmedArg)) {
          return trimmedArg
        }
        // Otherwise, treat it as a variable or expression
        const value = evaluateFormula(trimmedArg, getVariableValue)
        return value.toString()
      })
      
      // Call the actual function
      const result = MATH_FUNCTIONS[funcName](...evaluatedArgs.map(Number))
      return result.toString()
    })
  })

  // Then replace remaining variable names with their values
  const evaluatedFormula = processedFormula.replace(
    /[a-zA-Z_][a-zA-Z0-9_]*/g,
    (match) => {
      const value = getVariableValue(match)
      if (value === undefined || value === null) {
        throw new Error(`Variable "${match}" not found`)
      }
      return value.toString()
    }
  )

  try {
    // Use Function instead of eval for a more controlled environment
    const result = new Function(`return ${evaluatedFormula}`)()
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Formula must evaluate to a finite number')
    }
    return result
  } catch (error) {
    throw new Error(`Error evaluating formula: ${error.message}`)
  }
}

export {
  isSafeFormula,
  extractVariableNames,
  checkCircularDependency,
  evaluateFormula,
  MATH_FUNCTIONS
} 