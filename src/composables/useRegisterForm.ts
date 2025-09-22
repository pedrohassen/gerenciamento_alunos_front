import { ref } from "vue";
import { registerSchema, makeRule } from "../utils/validationSchema";
import { handleRegister } from "../services/authHandlers";

export function useRegisterForm() {
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const loading = ref(false);

  const nameRules = [makeRule(registerSchema, "name")];
  const emailRules = [makeRule(registerSchema, "email")];
  const passwordRules = [makeRule(registerSchema, "password")];
  const confirmPasswordRules = [makeRule(registerSchema, "confirmPassword")];

  const onSubmit = () =>
    handleRegister(
      name.value,
      email.value,
      password.value,
      confirmPassword.value,
      (val: boolean) => (loading.value = val)
    );

  return {
    name,
    email,
    password,
    confirmPassword,
    loading,
    nameRules,
    emailRules,
    passwordRules,
    confirmPasswordRules,
    onSubmit,
  };
}
