import { atualizarUsuario } from "./usuarioService";
import { editProfileSchema, changePasswordSchema } from "../utils/validationSchema";

type CurrentUser = {
  id: number;
  nome: string;
  email: string;
  perfil: number;
  status: boolean;
};

function extractErrorMessage(err: any, fallback: string): string {
  if (err?.issues) {
    return "Erro no formulário: " + err.issues.map((e: any) => e.message).join(", ");
  }
  return fallback + ": " + (err.response?.data?.mensagem || err.message);
}

export const handleEditProfile = async (
  currentUser: CurrentUser,
  name: string,
  email: string,
  currentPassword: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void
) => {
  setLoading(true);
  try {
    editProfileSchema.parse({ name, email, currentPassword });
    await atualizarUsuario({
      id: currentUser.id,
      nome: name,
      email,
      senha: currentPassword,
      perfil: currentUser.perfil,
      status: currentUser.status,
    });
    onSuccess();
  } catch (err: any) {
    alert(extractErrorMessage(err, "Falha ao atualizar perfil"));
  } finally {
    setLoading(false);
  }
};

export const handleChangePassword = async (
  currentUser: CurrentUser,
  newPassword: string,
  confirmNewPassword: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void
) => {
  setLoading(true);
  try {
    changePasswordSchema.parse({ newPassword, confirmNewPassword });
    await atualizarUsuario({
      id: currentUser.id,
      nome: currentUser.nome,
      email: currentUser.email,
      senha: newPassword,
      perfil: currentUser.perfil,
      status: currentUser.status,
    });
    onSuccess();
  } catch (err: any) {
    alert(extractErrorMessage(err, "Falha ao alterar senha"));
  } finally {
    setLoading(false);
  }
};
