import vm from "vm";

export function safeEval(input: string, context: any = {}) {
  const sandbox = { ...context };
  return vm.runInNewContext(input, sandbox);
}
