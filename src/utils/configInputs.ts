import { loginSchema, registerSchema, makeRule } from "../utils/validationSchema";

export const loginInputs = [
  { name: "email", type: "text", placeholder: "Email", rules: [makeRule(loginSchema, "email")] },
  { name: "senha", type: "password", placeholder: "Senha", rules: [makeRule(loginSchema, "senha")] },
];

export const registerInputs = [
  { name: "nome", type: "text", placeholder: "Nome", rules: [makeRule(registerSchema, "nome")] },
  { name: "email", type: "email", placeholder: "Email", rules: [makeRule(registerSchema, "email")] },
  { name: "senha", type: "password", placeholder: "Senha", rules: [makeRule(registerSchema, "senha")] },
  { name: "confirmarSenha", type: "password", placeholder: "Confirmar Senha", rules: [makeRule(registerSchema, "confirmarSenha")] },
];
