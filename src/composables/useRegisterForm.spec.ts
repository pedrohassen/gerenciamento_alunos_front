import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRegisterForm } from "./useRegisterForm";
import { handleRegister } from "../services/authHandlers";

vi.mock("../services/authHandlers", () => ({
  handleRegister: vi.fn(),
}));

describe("useRegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicia com todos os campos vazios e loading false", () => {
    const form = useRegisterForm();
    expect(form.name.value).toBe("");
    expect(form.email.value).toBe("");
    expect(form.password.value).toBe("");
    expect(form.confirmPassword.value).toBe("");
    expect(form.loading.value).toBe(false);
  });

  it("onSubmit chama handleRegister com todos os campos e o setter de loading", () => {
    const form = useRegisterForm();
    form.name.value = "Ana";
    form.email.value = "ana@teste.com";
    form.password.value = "Senha123!";
    form.confirmPassword.value = "Senha123!";

    form.onSubmit();

    expect(handleRegister).toHaveBeenCalledWith(
      "Ana",
      "ana@teste.com",
      "Senha123!",
      "Senha123!",
      expect.any(Function)
    );
  });
});
