import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleEditProfile, handleChangePassword } from "./usuarioHandlers";
import { atualizarUsuario } from "./usuarioService";

vi.mock("./usuarioService", () => ({
  atualizarUsuario: vi.fn(),
}));

const currentUser = { id: 1, nome: "Ana", email: "ana@teste.com", perfil: 1, status: true };

describe("handleEditProfile", () => {
  let setLoading: (val: boolean) => void;
  let onSuccess: () => void;
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    setLoading = vi.fn<(val: boolean) => void>();
    onSuccess = vi.fn<() => void>();
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("envia perfil/status do usuário atual inalterados, junto com os novos dados", async () => {
    (atualizarUsuario as any).mockResolvedValue({});

    await handleEditProfile(currentUser, "Ana Nova", "nova@teste.com", "SenhaAtual1!", setLoading, onSuccess);

    expect(atualizarUsuario).toHaveBeenCalledWith({
      id: 1,
      nome: "Ana Nova",
      email: "nova@teste.com",
      senha: "SenhaAtual1!",
      perfil: 1,
      status: true,
    });
    expect(onSuccess).toHaveBeenCalled();
  });

  it("bloqueia quando a senha atual está vazia, sem chamar a API", async () => {
    await handleEditProfile(currentUser, "Ana Nova", "nova@teste.com", "", setLoading, onSuccess);

    expect(atualizarUsuario).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("mostra a mensagem real do backend em caso de erro", async () => {
    (atualizarUsuario as any).mockRejectedValue({ response: { data: { mensagem: "Email já em uso" } } });

    await handleEditProfile(currentUser, "Ana Nova", "nova@teste.com", "SenhaAtual1!", setLoading, onSuccess);

    expect(alertSpy).toHaveBeenCalledWith("Falha ao atualizar perfil: Email já em uso");
    expect(onSuccess).not.toHaveBeenCalled();
  });
});

describe("handleChangePassword", () => {
  let setLoading: (val: boolean) => void;
  let onSuccess: () => void;

  beforeEach(() => {
    vi.clearAllMocks();
    setLoading = vi.fn<(val: boolean) => void>();
    onSuccess = vi.fn<() => void>();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("mantém nome/email/perfil/status do usuário atual, trocando só a senha", async () => {
    (atualizarUsuario as any).mockResolvedValue({});

    await handleChangePassword(currentUser, "NovaSenha1!", "NovaSenha1!", setLoading, onSuccess);

    expect(atualizarUsuario).toHaveBeenCalledWith({
      id: 1,
      nome: "Ana",
      email: "ana@teste.com",
      senha: "NovaSenha1!",
      perfil: 1,
      status: true,
    });
    expect(onSuccess).toHaveBeenCalled();
  });

  it("bloqueia quando a confirmação não bate com a nova senha", async () => {
    await handleChangePassword(currentUser, "NovaSenha1!", "Diferente1!", setLoading, onSuccess);

    expect(atualizarUsuario).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
