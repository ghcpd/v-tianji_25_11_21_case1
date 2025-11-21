import { runUserInput } from "./handlers/userInput";

/**
 * SECURE EXAMPLE: Use structured operations instead of arbitrary code
 */

// Example 1: Math operation
const mathOperation = JSON.stringify({
  type: 'math',
  operation: '+',
  operands: [10, 20, 30]
});

console.log("Math operation result:", runUserInput(mathOperation)); // 60

// Example 2: String operation
const stringOperation = JSON.stringify({
  type: 'string',
  operation: 'uppercase',
  values: ['hello world']
});

console.log("String operation result:", runUserInput(stringOperation)); // "HELLO WORLD"

// Example 3: JSON operation
const jsonOperation = JSON.stringify({
  type: 'json',
  operation: 'parse',
  data: '{"name": "test", "value": 123}'
});

console.log("JSON operation result:", runUserInput(jsonOperation)); // { name: 'test', value: 123 }

/**
 * The previous malicious payload would now be rejected:
 * - No base64 decoding of arbitrary code
 * - No string reversal obfuscation
 * - No vm.runInNewContext execution
 * - Only whitelisted operations allowed
 */
