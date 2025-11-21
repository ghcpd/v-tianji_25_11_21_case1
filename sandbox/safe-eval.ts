/**
 * SECURE ALTERNATIVE: Do NOT use vm module for untrusted code execution.
 * Instead, use a whitelist-based expression evaluator for safe operations.
 */

type AllowedOperation = 
  | { type: 'math'; operation: '+' | '-' | '*' | '/'; operands: number[] }
  | { type: 'string'; operation: 'concat' | 'uppercase' | 'lowercase'; values: string[] }
  | { type: 'json'; operation: 'parse' | 'stringify'; data: any };

/**
 * Execute only explicitly allowed, pre-defined operations.
 * NO arbitrary code execution.
 */
export function safeEval(input: string, context: any = {}): any {
  throw new Error(
    "SECURITY: Arbitrary code execution is disabled. " +
    "Use executeAllowedOperation() with validated operation objects instead."
  );
}

/**
 * Secure alternative: Execute only whitelisted operations
 */
export function executeAllowedOperation(operation: AllowedOperation): any {
  switch (operation.type) {
    case 'math':
      return executeMathOperation(operation);
    case 'string':
      return executeStringOperation(operation);
    case 'json':
      return executeJsonOperation(operation);
    default:
      throw new Error(`Operation type not allowed: ${(operation as any).type}`);
  }
}

function executeMathOperation(op: Extract<AllowedOperation, { type: 'math' }>): number {
  const { operation, operands } = op;
  
  // Validate operands are numbers
  if (!operands.every(n => typeof n === 'number' && isFinite(n))) {
    throw new Error('Invalid operands for math operation');
  }
  
  switch (operation) {
    case '+':
      return operands.reduce((a, b) => a + b, 0);
    case '-':
      return operands.reduce((a, b) => a - b);
    case '*':
      return operands.reduce((a, b) => a * b, 1);
    case '/':
      return operands.reduce((a, b) => {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      });
    default:
      throw new Error(`Math operation not allowed: ${operation}`);
  }
}

function executeStringOperation(op: Extract<AllowedOperation, { type: 'string' }>): string {
  const { operation, values } = op;
  
  // Validate all values are strings
  if (!values.every(v => typeof v === 'string')) {
    throw new Error('Invalid values for string operation');
  }
  
  switch (operation) {
    case 'concat':
      return values.join('');
    case 'uppercase':
      return values[0]?.toUpperCase() || '';
    case 'lowercase':
      return values[0]?.toLowerCase() || '';
    default:
      throw new Error(`String operation not allowed: ${operation}`);
  }
}

function executeJsonOperation(op: Extract<AllowedOperation, { type: 'json' }>): any {
  const { operation, data } = op;
  
  switch (operation) {
    case 'parse':
      if (typeof data !== 'string') {
        throw new Error('JSON parse requires string input');
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        throw new Error('Invalid JSON');
      }
    case 'stringify':
      return JSON.stringify(data);
    default:
      throw new Error(`JSON operation not allowed: ${operation}`);
  }
}
