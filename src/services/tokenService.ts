import { jwtDecode } from "jwt-decode";
import { getToken } from "./authService";

interface TokenPayload {
  sub: string;
  email: string;
  exp: number;
}

export function getUserIdFromToken(): number | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return Number(decoded.sub);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
