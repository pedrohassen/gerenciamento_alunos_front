import { loginSchema, registerSchema, editProfileSchema, changePasswordBaseSchema, alunoSchema, makeRule } from "../utils/validationSchema";

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

export const editProfileInputs = [
  { name: "name", type: "text", placeholder: "Nome", rules: [makeRule(editProfileSchema, "name")] },
  { name: "email", type: "email", placeholder: "Email", rules: [makeRule(editProfileSchema, "email")] },
  { name: "currentPassword", type: "password", placeholder: "Senha atual", rules: [makeRule(editProfileSchema, "currentPassword")] },
];

export const changePasswordInputs = [
  { name: "newPassword", type: "password", placeholder: "Nova senha", rules: [makeRule(changePasswordBaseSchema, "newPassword")] },
  { name: "confirmNewPassword", type: "password", placeholder: "Confirmar nova senha", rules: [makeRule(changePasswordBaseSchema, "confirmNewPassword")] },
];

export const alunoInputs = [
  { name: "nome", type: "text", placeholder: "Nome", rules: [makeRule(alunoSchema, "nome")] },
  { name: "email", type: "email", placeholder: "Email", rules: [makeRule(alunoSchema, "email")] },
  { name: "curso", type: "text", placeholder: "Curso", rules: [makeRule(alunoSchema, "curso")] },
  { name: "dataNascimento", type: "date", placeholder: "Data de Nascimento", rules: [makeRule(alunoSchema, "dataNascimento")] },
];
