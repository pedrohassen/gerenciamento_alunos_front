import { login, register, logout } from "./authService";
import router from "../router";
import { loginSchema, registerSchema } from "../utils/validationSchema";

export const handleLogin = async (email: string, password: string, setLoading: (val: boolean) => void) => {
  setLoading(true);
  try {
    loginSchema.parse({ email, password });
    await login(email, password);
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
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  setLoading: (val: boolean) => void
) => {
  setLoading(true);
  try {
    registerSchema.parse({ name, email, password, confirmPassword });
    await register(name, email, password);
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
