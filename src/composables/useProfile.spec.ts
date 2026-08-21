import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Cookies from "js-cookie";
import { useProfile } from "./useProfile";
import api from "../api/axios";
import { buildFakeToken } from "../test-utils/fakeToken";

vi.mock("../api/axios", () => ({
  default: { get: vi.fn() },
}));

const FUTURE_EXP = 9999999999;

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  Cookies.remove("token");
});

describe("useProfile", () => {
  it("marca erro 'Usuário não autenticado' quando não há token, sem chamar a API", async () => {
    const { fetchUser, error, user } = useProfile();

    await fetchUser();

    expect(error.value).toBe("Usuário não autenticado");
    expect(user.value).toBeNull();
    expect(api.get).not.toHaveBeenCalled();
  });

  it("carrega o usuário usando o id extraído do token", async () => {
    Cookies.set("token", buildFakeToken({ sub: "7", exp: FUTURE_EXP }));
    (api.get as any).mockResolvedValue({ data: { id: 7, nome: "Ana", email: "ana@teste.com" } });

    const { fetchUser, user, loading, error } = useProfile();
    await fetchUser();

    expect(api.get).toHaveBeenCalledWith("/usuario/7");
    expect(user.value).toEqual({ id: 7, nome: "Ana", email: "ana@teste.com" });
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it("usa a mensagem de erro do backend (chave 'mensagem') quando a API falha", async () => {
    Cookies.set("token", buildFakeToken({ sub: "7", exp: FUTURE_EXP }));
    (api.get as any).mockRejectedValue({ response: { data: { mensagem: "Falha ao buscar" } } });

    const { fetchUser, error } = useProfile();
    await fetchUser();

    expect(error.value).toBe("Falha ao buscar");
  });

  it("usa mensagem genérica quando o erro não vem com 'mensagem'", async () => {
    Cookies.set("token", buildFakeToken({ sub: "7", exp: FUTURE_EXP }));
    (api.get as any).mockRejectedValue(new Error("network error"));

    const { fetchUser, error } = useProfile();
    await fetchUser();

    expect(error.value).toBe("Erro ao carregar perfil");
  });
});
