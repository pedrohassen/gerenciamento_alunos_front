import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registerSchema,
  editProfileSchema,
  changePasswordSchema,
  alunoSchema,
  makeRule,
} from "./validationSchema";

describe("loginSchema", () => {
  it("aceita email e senha válidos", () => {
    const result = loginSchema.safeParse({ email: "ana@teste.com", password: "Senha123!" });
    expect(result.success).toBe(true);
  });

  it("rejeita email inválido", () => {
    const result = loginSchema.safeParse({ email: "nao-e-email", password: "Senha123!" });
    expect(result.success).toBe(false);
  });

  it("rejeita senha fraca (sem caractere especial)", () => {
    const result = loginSchema.safeParse({ email: "ana@teste.com", password: "Senha1234" });
    expect(result.success).toBe(false);
  });

  it("rejeita senha vazia", () => {
    const result = loginSchema.safeParse({ email: "ana@teste.com", password: "" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const base = { name: "Ana", email: "ana@teste.com", password: "Senha123!", confirmPassword: "Senha123!" };

  it("aceita quando as senhas coincidem", () => {
    expect(registerSchema.safeParse(base).success).toBe(true);
  });

  it("rejeita quando as senhas não coincidem", () => {
    const result = registerSchema.safeParse({ ...base, confirmPassword: "Outra123!" });
    expect(result.success).toBe(false);
  });

  it("rejeita nome vazio", () => {
    expect(registerSchema.safeParse({ ...base, name: "" }).success).toBe(false);
  });
});

describe("editProfileSchema", () => {
  it("aceita nome, email e senha atual preenchidos", () => {
    const result = editProfileSchema.safeParse({ name: "Ana", email: "ana@teste.com", currentPassword: "qualquer" });
    expect(result.success).toBe(true);
  });

  it("rejeita senha atual vazia", () => {
    const result = editProfileSchema.safeParse({ name: "Ana", email: "ana@teste.com", currentPassword: "" });
    expect(result.success).toBe(false);
  });

  it("não exige senha forte pra confirmar senha atual (só não-vazia)", () => {
    const result = editProfileSchema.safeParse({ name: "Ana", email: "ana@teste.com", currentPassword: "123" });
    expect(result.success).toBe(true);
  });
});

describe("changePasswordSchema", () => {
  it("aceita quando nova senha e confirmação coincidem", () => {
    const result = changePasswordSchema.safeParse({ newPassword: "Senha123!", confirmNewPassword: "Senha123!" });
    expect(result.success).toBe(true);
  });

  it("rejeita quando não coincidem", () => {
    const result = changePasswordSchema.safeParse({ newPassword: "Senha123!", confirmNewPassword: "Diferente1!" });
    expect(result.success).toBe(false);
  });

  it("rejeita nova senha fraca", () => {
    const result = changePasswordSchema.safeParse({ newPassword: "12345678", confirmNewPassword: "12345678" });
    expect(result.success).toBe(false);
  });
});

describe("alunoSchema", () => {
  const base = { nome: "Carlos", email: "carlos@teste.com", curso: "Medicina", dataNascimento: "2001-03-15" };

  it("aceita dados válidos com data de nascimento no passado", () => {
    expect(alunoSchema.safeParse(base).success).toBe(true);
  });

  it("rejeita data de nascimento no futuro", () => {
    const futuro = new Date();
    futuro.setFullYear(futuro.getFullYear() + 1);
    const result = alunoSchema.safeParse({ ...base, dataNascimento: futuro.toISOString().slice(0, 10) });
    expect(result.success).toBe(false);
  });

  it("rejeita curso vazio", () => {
    expect(alunoSchema.safeParse({ ...base, curso: "" }).success).toBe(false);
  });

  it("rejeita data de nascimento vazia", () => {
    expect(alunoSchema.safeParse({ ...base, dataNascimento: "" }).success).toBe(false);
  });
});

describe("makeRule", () => {
  it("retorna true quando o valor passa na validação", () => {
    const rule = makeRule(loginSchema, "email");
    expect(rule("ana@teste.com")).toBe(true);
  });

  it("retorna a mensagem de erro quando o valor não passa", () => {
    const rule = makeRule(loginSchema, "email");
    const result = rule("invalido");
    expect(result).not.toBe(true);
    expect(typeof result).toBe("string");
  });
});
