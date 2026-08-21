import { describe, it, expect } from "vitest";
import { ref } from "vue";
import { isFormValid } from "./formValidation";

describe("isFormValid", () => {
  it("retorna true quando todos os campos listados em inputs estão preenchidos", () => {
    const values = { nome: ref("Ana"), email: ref("ana@teste.com") };
    const inputs = [{ name: "nome" }, { name: "email" }];

    expect(isFormValid(inputs, values)).toBe(true);
  });

  it("retorna false quando algum campo está vazio", () => {
    const values = { nome: ref("Ana"), email: ref("") };
    const inputs = [{ name: "nome" }, { name: "email" }];

    expect(isFormValid(inputs, values)).toBe(false);
  });

  it("retorna false quando o campo só tem espaços em branco", () => {
    const values = { nome: ref("   ") };
    const inputs = [{ name: "nome" }];

    expect(isFormValid(inputs, values)).toBe(false);
  });

  it("retorna true para lista de inputs vazia", () => {
    expect(isFormValid([], {})).toBe(true);
  });
});
