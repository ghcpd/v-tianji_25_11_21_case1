/**
 * DEPRECATED: This function enabled arbitrary code execution.
 * DO NOT decode and execute arbitrary code from user input.
 * 
 * If you need to process encoded data:
 * 1. Use proper authentication/authorization
 * 2. Validate against a strict schema
 * 3. Use allowlists, not code execution
 */
export function decodePayload(str: string): never {
  throw new Error(
    "SECURITY: decodePayload is disabled. " +
    "Arbitrary code execution from user input is not allowed. " +
    "Use structured JSON operations instead."
  );
}

/**
 * Secure alternative: Validate and parse structured data only
 */
export function validateAndParseJson(input: string): any {
  // 1. Check input size to prevent DoS
  const MAX_INPUT_SIZE = 1024 * 100; // 100KB limit
  if (input.length > MAX_INPUT_SIZE) {
    throw new Error('Input exceeds maximum allowed size');
  }
  
  // 2. Parse JSON safely
  try {
    const parsed = JSON.parse(input);
    return parsed;
  } catch (e) {
    throw new Error('Invalid JSON input');
  }
}
