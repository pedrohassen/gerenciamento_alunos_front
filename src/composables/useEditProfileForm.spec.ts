import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useEditProfileForm } from "./useEditProfileForm";
import { handleEditProfile } from "../services/usuarioHandlers";

vi.mock("../services/usuarioHandlers", () => ({
  handleEditProfile: vi.fn(),
  handleChangePassword: vi.fn(),
}));

describe("useEditProfileForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("resetForm preenche nome/email a partir do usuário carregado e limpa a senha", () => {
    const user = ref({ nome: "Ana", email: "ana@teste.com" });
    const form = useEditProfileForm(user, vi.fn());

    form.currentPassword.value = "algo digitado antes";
    form.resetForm();

    expect(form.name.value).toBe("Ana");
    expect(form.email.value).toBe("ana@teste.com");
    expect(form.currentPassword.value).toBe("");
  });

  it("resetForm não quebra quando o usuário ainda não carregou (null)", () => {
    const user = ref<any>(null);
    const form = useEditProfileForm(user, vi.fn());

    form.resetForm();

    expect(form.name.value).toBe("");
    expect(form.email.value).toBe("");
  });

  it("onSubmit chama handleEditProfile com o usuário atual, os campos do form e onSuccess", () => {
    const user = ref({ id: 1, nome: "Ana", email: "ana@teste.com", perfil: 1, status: true });
    const onSuccess = vi.fn();
    const form = useEditProfileForm(user, onSuccess);

    form.name.value = "Ana Editada";
    form.email.value = "nova@teste.com";
    form.currentPassword.value = "SenhaAtual1!";

    form.onSubmit();

    expect(handleEditProfile).toHaveBeenCalledWith(
      user.value,
      "Ana Editada",
      "nova@teste.com",
      "SenhaAtual1!",
      expect.any(Function),
      onSuccess
    );
  });
});
