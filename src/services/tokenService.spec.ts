import { describe, it, expect, afterEach } from "vitest";
import Cookies from "js-cookie";
import { getUserIdFromToken, getUserRoleFromToken, isTokenExpired } from "./tokenService";
import { buildFakeToken as buildToken } from "../test-utils/fakeToken";

const ROLE_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role";

const FUTURE_EXP = 9999999999;
const PAST_EXP = 1000000000;

afterEach(() => {
  Cookies.remove("token");
});

describe("getUserIdFromToken", () => {
  it("retorna o id a partir da claim 'sub' do token", () => {
    Cookies.set("token", buildToken({ sub: "42", exp: FUTURE_EXP }));
    expect(getUserIdFromToken()).toBe(42);
  });

  it("retorna null quando não há token", () => {
    expect(getUserIdFromToken()).toBeNull();
  });

  it("retorna null quando o token é inválido", () => {
    Cookies.set("token", "isso-nao-e-um-jwt");
    expect(getUserIdFromToken()).toBeNull();
  });
});

describe("getUserRoleFromToken", () => {
  it("lê o perfil pela claim de URI completa (http://schemas.xmlsoap.org/.../role), não por 'role'", () => {
    Cookies.set("token", buildToken({ sub: "1", exp: FUTURE_EXP, [ROLE_CLAIM]: "ADMIN" }));
    expect(getUserRoleFromToken()).toBe("ADMIN");
  });

  it("retorna null se o token tiver uma claim curta 'role' em vez da URI completa", () => {
    // Regressão: a API nunca gera esse formato, mas serve pra provar que a
    // implementação depende mesmo da chave longa, não de "role".
    Cookies.set("token", buildToken({ sub: "1", exp: FUTURE_EXP, role: "ADMIN" }));
    expect(getUserRoleFromToken()).toBeNull();
  });

  it("retorna null quando não há token", () => {
    expect(getUserRoleFromToken()).toBeNull();
  });
});

describe("isTokenExpired", () => {
  it("retorna false para um token com exp no futuro", () => {
    Cookies.set("token", buildToken({ sub: "1", exp: FUTURE_EXP }));
    expect(isTokenExpired()).toBe(false);
  });

  it("retorna true para um token com exp no passado", () => {
    Cookies.set("token", buildToken({ sub: "1", exp: PAST_EXP }));
    expect(isTokenExpired()).toBe(true);
  });

  it("retorna true quando não há token", () => {
    expect(isTokenExpired()).toBe(true);
  });

  it("retorna true quando o token é inválido", () => {
    Cookies.set("token", "lixo.nao.decodificavel");
    expect(isTokenExpired()).toBe(true);
  });
});
