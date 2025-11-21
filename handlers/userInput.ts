import { decodePayload } from "../utils/decodePayload";
import { safeEval } from "../sandbox/safe-eval";

export function runUserInput(base64: string) {
  const code = decodePayload(base64);
  return safeEval(code, { console });
}
