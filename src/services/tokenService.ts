import { jwtDecode } from "jwt-decode";
import { getToken } from "./authService";

// A API monta o claim de perfil com Claim(ClaimTypes.Role, ...) e escreve o token
// direto via `new JwtSecurityToken(issuer, audience, claims, ...)`, sem mapeamento
// outbound — por isso a chave no payload é a URI completa que ClaimTypes.Role
// realmente serializa (confirmado decodificando um token real gerado pela API em
// produção), não "role" nem a URI do schema antigo do xmlsoap.org.
const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

interface TokenPayload {
  sub: string;
  email: string;
  exp: number;
  [claim: string]: unknown;
}

function decodeToken(): TokenPayload | null {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export function getUserIdFromToken(): number | null {
  const decoded = decodeToken();
  return decoded ? Number(decoded.sub) : null;
}

export function getUserRoleFromToken(): string | null {
  const decoded = decodeToken();
  return (decoded?.[ROLE_CLAIM] as string) ?? null;
}

export function isTokenExpired(): boolean {
  const decoded = decodeToken();
  if (!decoded) return true;

  return decoded.exp * 1000 < Date.now();
}
