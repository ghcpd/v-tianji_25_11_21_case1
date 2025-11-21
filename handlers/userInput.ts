import { executeAllowedOperation } from "../sandbox/safe-eval";

/**
 * SECURE REDESIGN: Accept only structured, validated operation requests.
 * NO arbitrary code execution from user input.
 */
export function runUserInput(operationJson: string): any {
  // 1. Validate input is valid JSON
  let operation;
  try {
    operation = JSON.parse(operationJson);
  } catch (e) {
    throw new Error('Invalid input: must be valid JSON');
  }
  
  // 2. Validate structure
  if (!operation || typeof operation !== 'object') {
    throw new Error('Invalid operation: must be an object');
  }
  
  if (!operation.type || typeof operation.type !== 'string') {
    throw new Error('Invalid operation: missing or invalid type field');
  }
  
  // 3. Whitelist allowed operation types
  const allowedTypes = ['math', 'string', 'json'];
  if (!allowedTypes.includes(operation.type)) {
    throw new Error(`Operation type not allowed: ${operation.type}`);
  }
  
  // 4. Additional validation based on type
  validateOperationStructure(operation);
  
  // 5. Execute only the whitelisted operation
  return executeAllowedOperation(operation);
}

function validateOperationStructure(operation: any): void {
  switch (operation.type) {
    case 'math':
      if (!operation.operation || !['+', '-', '*', '/'].includes(operation.operation)) {
        throw new Error('Invalid math operation');
      }
      if (!Array.isArray(operation.operands)) {
        throw new Error('Math operation requires operands array');
      }
      break;
      
    case 'string':
      if (!operation.operation || !['concat', 'uppercase', 'lowercase'].includes(operation.operation)) {
        throw new Error('Invalid string operation');
      }
      if (!Array.isArray(operation.values)) {
        throw new Error('String operation requires values array');
      }
      break;
      
    case 'json':
      if (!operation.operation || !['parse', 'stringify'].includes(operation.operation)) {
        throw new Error('Invalid JSON operation');
      }
      if (operation.data === undefined) {
        throw new Error('JSON operation requires data field');
      }
      break;
      
    default:
      throw new Error(`Unknown operation type: ${operation.type}`);
  }
}
