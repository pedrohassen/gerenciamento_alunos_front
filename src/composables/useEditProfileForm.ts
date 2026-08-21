import { ref, type Ref } from "vue";
import { handleEditProfile } from "../services/usuarioHandlers";

export function useEditProfileForm(user: Ref<any>, onSuccess: () => void) {
  const name = ref("");
  const email = ref("");
  const currentPassword = ref("");
  const loading = ref(false);

  const resetForm = () => {
    name.value = user.value?.nome ?? "";
    email.value = user.value?.email ?? "";
    currentPassword.value = "";
  };

  const onSubmit = () =>
    handleEditProfile(
      user.value,
      name.value,
      email.value,
      currentPassword.value,
      (val: boolean) => (loading.value = val),
      onSuccess
    );

  return {
    name,
    email,
    currentPassword,
    loading,
    resetForm,
    onSubmit,
  };
}
