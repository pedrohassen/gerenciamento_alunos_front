import { ref } from "vue";
import { registerSchema, makeRule } from "../utils/validationSchema";
import { handleRegister } from "../services/authHandlers";

export function useRegisterForm() {
  const nome = ref("");
  const email = ref("");
  const senha = ref("");
  const confirmarSenha = ref("");
  const loading = ref(false);

  const nameRules = [makeRule(registerSchema, "nome")];
  const emailRules = [makeRule(registerSchema, "email")];
  const passwordRules = [makeRule(registerSchema, "senha")];
  const confirmPasswordRules = [makeRule(registerSchema, "confirmarSenha")];

  const onSubmit = () =>
    handleRegister(
      nome.value,
      email.value,
      senha.value,
      confirmarSenha.value,
      (val: boolean) => (loading.value = val)
    );

  return {
    nome,
    email,
    senha,
    confirmarSenha,
    loading,
    nameRules,
    emailRules,
    passwordRules,
    confirmPasswordRules,
    onSubmit,
  };
}
