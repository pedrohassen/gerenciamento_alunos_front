import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useChangePasswordForm } from "./useChangePasswordForm";
import { handleChangePassword } from "../services/usuarioHandlers";

vi.mock("../services/usuarioHandlers", () => ({
  handleEditProfile: vi.fn(),
  handleChangePassword: vi.fn(),
}));

describe("useChangePasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("resetForm limpa os campos de senha", () => {
    const user = ref({ id: 1, nome: "Ana", email: "ana@teste.com", perfil: 1, status: true });
    const form = useChangePasswordForm(user, vi.fn());

    form.newPassword.value = "algo";
    form.confirmNewPassword.value = "algo";
    form.resetForm();

    expect(form.newPassword.value).toBe("");
    expect(form.confirmNewPassword.value).toBe("");
  });

  it("onSubmit chama handleChangePassword com o usuário atual, as senhas e onSuccess", () => {
    const user = ref({ id: 1, nome: "Ana", email: "ana@teste.com", perfil: 1, status: true });
    const onSuccess = vi.fn();
    const form = useChangePasswordForm(user, onSuccess);

    form.newPassword.value = "NovaSenha1!";
    form.confirmNewPassword.value = "NovaSenha1!";

    form.onSubmit();

    expect(handleChangePassword).toHaveBeenCalledWith(
      user.value,
      "NovaSenha1!",
      "NovaSenha1!",
      expect.any(Function),
      onSuccess
    );
  });
});
