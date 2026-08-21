import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleLogin, handleRegister, handleLogout } from "./authHandlers";
import { login, register, logout } from "./authService";
import router from "../router";

vi.mock("./authService", () => ({
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
}));

vi.mock("../router", () => ({
  default: { push: vi.fn() },
}));

describe("handleLogin", () => {
  let setLoading: (val: boolean) => void;
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    setLoading = vi.fn<(val: boolean) => void>();
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("faz login, redireciona pra /home e desliga o loading", async () => {
    (login as any).mockResolvedValue({ token: "abc" });

    await handleLogin("ana@teste.com", "Senha123!", setLoading);

    expect(login).toHaveBeenCalledWith("ana@teste.com", "Senha123!");
    expect(router.push).toHaveBeenCalledWith("/home");
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenLastCalledWith(false);
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it("valida o formulário com zod antes de chamar a API (email inválido)", async () => {
    await handleLogin("nao-e-email", "Senha123!", setLoading);

    expect(login).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining("Erro no formulário"));
  });

  it("regressão: mostra a mensagem real do backend (chave 'mensagem'), não undefined", async () => {
    (login as any).mockRejectedValue({ response: { data: { mensagem: "Credenciais inválidas" } } });

    await handleLogin("ana@teste.com", "Senha123!", setLoading);

    expect(alertSpy).toHaveBeenCalledWith("Falha no login: Credenciais inválidas");
  });
});

describe("handleRegister", () => {
  let setLoading: (val: boolean) => void;
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    setLoading = vi.fn<(val: boolean) => void>();
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("cadastra e redireciona pra /home", async () => {
    (register as any).mockResolvedValue({ token: "abc" });

    await handleRegister("Ana", "ana@teste.com", "Senha123!", "Senha123!", setLoading);

    expect(register).toHaveBeenCalledWith("Ana", "ana@teste.com", "Senha123!");
    expect(router.push).toHaveBeenCalledWith("/home");
  });

  it("bloqueia quando as senhas não coincidem, sem chamar a API", async () => {
    await handleRegister("Ana", "ana@teste.com", "Senha123!", "Outra123!", setLoading);

    expect(register).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining("Erro no formulário"));
  });

  it("regressão: mostra a mensagem real do backend em caso de erro da API", async () => {
    (register as any).mockRejectedValue({ response: { data: { mensagem: "Email já cadastrado" } } });

    await handleRegister("Ana", "ana@teste.com", "Senha123!", "Senha123!", setLoading);

    expect(alertSpy).toHaveBeenCalledWith("Falha no cadastro: Email já cadastrado");
  });
});

describe("handleLogout", () => {
  it("desloga e redireciona pra /login", () => {
    vi.clearAllMocks();
    const setLoading = vi.fn<(val: boolean) => void>();

    handleLogout(setLoading);

    expect(logout).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/login");
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenLastCalledWith(false);
  });
});
