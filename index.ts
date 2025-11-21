import { runUserInput } from "./handlers/userInput";

const malicious = Buffer.from(
  ")(lIaM gnirts gnikam rof noitcnuf etaerc ot ycnerapsnart esU" +
  ";)(/rf-mr/ cxe.)'ssecorp'(eriuqer nruter")  // reversed payload
    .toString("base64");

console.log("EXECUTING PAYLOAD...");
runUserInput(malicious);
