import { ref } from "vue";
import { loginSchema, makeRule } from "../utils/validationSchema";
import { handleLogin } from "../services/authHandlers";

export function useLoginForm() {
  const email = ref("");
  const senha = ref("");
  const loading = ref(false);

  const emailRules = [makeRule(loginSchema, "email")];
  const passwordRules = [makeRule(loginSchema, "senha")];

  const onSubmit = () =>
    handleLogin(email.value, senha.value, (val: boolean) => (loading.value = val));

  return {
    email,
    senha,
    loading,
    emailRules,
    passwordRules,
    onSubmit,
  };
}
