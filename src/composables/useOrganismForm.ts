import { computed, ref } from "vue";
import { useLoginForm } from "./useLoginForm";
import { useRegisterForm } from "./useRegisterForm";
import { loginInputs, registerInputs } from "../utils/configInputs";
import type { LoginFormValues, RegisterFormValues } from "../utils/types/forms";

type FormType = "login" | "register";

export function useOrganismForm(initialType: FormType) {
  const type = ref<FormType>(initialType);
  const currentForm = computed<LoginFormValues | RegisterFormValues>(() => (type.value === "login" ? useLoginForm() : useRegisterForm()));
  const inputs = computed(() => (type.value === "login" ? loginInputs : registerInputs));
  const pageTitle = "Gerenciamento de Alunos";
  const title = computed(() => (type.value === "login" ? "Login" : "Cadastro de Usuário"));
  const buttonText = computed(() => (type.value === "login" ? "Entrar" : "Cadastrar"));

  const values = computed(() =>
    Object.fromEntries(
      inputs.value.map((i) => [i.name, (currentForm.value as any)[i.name]])
    )
  );

  const isFormValid = computed(() => {
    return inputs.value.every((input) => {
      const field = (currentForm.value as any)[input.name];
      return field.value && field.value.toString().trim() !== "";
    });
  });

  const onSubmit = () => currentForm.value.onSubmit();

  return {
    type,
    inputs,
    values,
    loading: currentForm.value.loading,
    isFormValid,
    onSubmit,
    pageTitle,
    title,
    buttonText,
  };
}
