import api from "../api/axios";

export type UsuarioPayload = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfil: number;
  status: boolean;
};

export async function atualizarUsuario(payload: UsuarioPayload) {
  const response = await api.put("/usuario", payload);
  return response.data;
}
