import { loginSchema, registerSchema, makeRule } from "../utils/validationSchema";

export const loginInputs = [
  { name: "email", type: "text", placeholder: "Email", rules: [makeRule(loginSchema, "email")] },
  { name: "password", type: "password", placeholder: "Senha", rules: [makeRule(loginSchema, "password")] },
];

export const registerInputs = [
  { name: "name", type: "text", placeholder: "Nome", rules: [makeRule(registerSchema, "name")] },
  { name: "email", type: "email", placeholder: "Email", rules: [makeRule(registerSchema, "email")] },
  { name: "password", type: "password", placeholder: "Senha", rules: [makeRule(registerSchema, "password")] },
  { name: "confirmPassword", type: "password", placeholder: "Confirmar Senha", rules: [makeRule(registerSchema, "confirmPassword")] },
];
