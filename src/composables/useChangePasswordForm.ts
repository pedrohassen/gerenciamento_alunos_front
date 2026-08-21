import { ref, type Ref } from "vue";
import { handleChangePassword } from "../services/usuarioHandlers";

export function useChangePasswordForm(user: Ref<any>, onSuccess: () => void) {
  const newPassword = ref("");
  const confirmNewPassword = ref("");
  const loading = ref(false);

  const resetForm = () => {
    newPassword.value = "";
    confirmNewPassword.value = "";
  };

  const onSubmit = () =>
    handleChangePassword(
      user.value,
      newPassword.value,
      confirmNewPassword.value,
      (val: boolean) => (loading.value = val),
      onSuccess
    );

  return {
    newPassword,
    confirmNewPassword,
    loading,
    resetForm,
    onSubmit,
  };
}
