import { login, register, logout } from "./authService";
import router from "../router";
import { loginSchema, registerSchema } from "../utils/validationSchema";

export const handleLogin = async (email: string, senha: string, setLoading: (val: boolean) => void) => {
  setLoading(true);
  try {
    loginSchema.parse({ email, senha });
    await login(email, senha);
    router.push("/home");
  } catch (err: any) {
    if (err?.errors) {
      alert("Erro no formulário: " + err.errors.map((e: any) => e.message).join(", "));
    } else {
      alert("Falha no login: " + (err.response?.data?.message || err.message));
    }
  } finally {
    setLoading(false);
  }
};

export const handleRegister = async (
  nome: string,
  email: string,
  senha: string,
  confirmarSenha: string,
  setLoading: (val: boolean) => void
) => {
  setLoading(true);
  try {
    registerSchema.parse({ nome, email, senha, confirmarSenha });
    await register(nome, email, senha);
    router.push("/home");
  } catch (err: any) {
    if (err?.errors) {
      alert("Erro no formulário: " + err.errors.map((e: any) => e.message).join(", "));
    } else {
      alert("Falha no cadastro: " + (err.response?.data?.message || err.message));
    }
  } finally {
    setLoading(false);
  }
};

export const handleLogout = (setLoading: (val: boolean) => void) => {
  setLoading(true);
  try {
    logout();
    router.push("/login");
  } catch (err: any) {
    alert("Falha ao deslogar: " + (err.response?.data?.message || err.message));
  } finally {
    setLoading(false);
  }
};
