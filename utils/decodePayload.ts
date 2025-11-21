export function decodePayload(str: string) {
  // Obfuscated: base64 → reversed string → JS code
  const reversed = Buffer.from(str, "base64").toString().split("").reverse().join("");
  return reversed;
}
