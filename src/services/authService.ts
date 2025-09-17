import api from "../api/axios";
import Cookies from "js-cookie";

export async function login(email: string, senha: string) {
  const response = await api.post("/Usuario/login", { email, senha });

  Cookies.set("token", response.data.token, { expires: 1 });

  return response.data;
}

export async function register(nome: string, email: string, senha: string) {
  const response = await api.post("/Usuario/registrar", {
    nome,
    email,
    senha,
  });

  Cookies.set("token", response.data.token, { expires: 1 });
  return response.data;
}

export function logout() {
  Cookies.remove("token");
}

export function getToken() {
  return Cookies.get("token");
}
