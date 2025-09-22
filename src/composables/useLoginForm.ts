import { ref } from "vue";
import { loginSchema, makeRule } from "../utils/validationSchema";
import { handleLogin } from "../services/authHandlers";

export function useLoginForm() {
  const email = ref("");
  const password = ref("");
  const loading = ref(false);

  const emailRules = [makeRule(loginSchema, "email")];
  const passwordRules = [makeRule(loginSchema, "password")];

  const onSubmit = () =>
    handleLogin(email.value, password.value, (val: boolean) => (loading.value = val));

  return {
    email,
    password,
    loading,
    emailRules,
    passwordRules,
    onSubmit,
  };
}
