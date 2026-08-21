import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLoginForm } from "./useLoginForm";
import { handleLogin } from "../services/authHandlers";

vi.mock("../services/authHandlers", () => ({
  handleLogin: vi.fn(),
}));

describe("useLoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicia com campos vazios e loading false", () => {
    const form = useLoginForm();
    expect(form.email.value).toBe("");
    expect(form.password.value).toBe("");
    expect(form.loading.value).toBe(false);
  });

  it("onSubmit chama handleLogin com email, senha e o setter de loading", () => {
    const form = useLoginForm();
    form.email.value = "ana@teste.com";
    form.password.value = "Senha123!";

    form.onSubmit();

    expect(handleLogin).toHaveBeenCalledWith("ana@teste.com", "Senha123!", expect.any(Function));
  });

  it("expõe uma regra de validação pra email e uma pra senha", () => {
    const form = useLoginForm();
    expect(form.emailRules).toHaveLength(1);
    expect(form.passwordRules).toHaveLength(1);
  });
});
