import { jwtDecode } from "jwt-decode";
import { getToken } from "./authService";

interface TokenPayload {
  id: number;
  email: string;
  nome: string;
  exp: number;
}

export function getUserIdFromToken(): number | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.id;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
