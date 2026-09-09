<template>
  <div class="organism-profile">
    <header class="organism-profile__header">
      <AtomText tag="h1" class="text-h4 font-weight-bold d-block">{{ title }}</AtomText>
      <AtomText tag="p" class="text-body-2 text-medium-emphasis d-block mt-1">
        Seus dados de acesso ao sistema.
      </AtomText>
    </header>

    <v-progress-circular v-if="loading && !user" indeterminate color="primary" class="mt-8" />

    <v-alert v-else-if="error" type="error" class="mt-8" max-width="520">
      {{ error }}
    </v-alert>

    <MoleculeCardInfo v-else title="Informações da conta" :items="items">
      <template #actions>
        <AtomButton buttonColor="primary" @click="openEditDialog">Editar Perfil</AtomButton>
        <AtomButton buttonColor="secondary" variant="tonal" @click="openPasswordDialog">
          Alterar Senha
        </AtomButton>
      </template>
    </MoleculeCardInfo>

    <v-dialog v-model="editDialogOpen" max-width="450">
      <MoleculeForm
        pageTitle="Editar Perfil"
        title=""
        buttonText="Salvar"
        width="100%"
        :inputs="editProfileInputs"
        :values="editValues"
        :loading="editProfile.loading.value"
        :isFormValid="editIsFormValid"
        :onSubmit="editProfile.onSubmit"
      />
    </v-dialog>

    <v-dialog v-model="passwordDialogOpen" max-width="450">
      <MoleculeForm
        pageTitle="Alterar Senha"
        title=""
        buttonText="Salvar"
        width="100%"
        :inputs="changePasswordInputs"
        :values="passwordValues"
        :loading="changePassword.loading.value"
        :isFormValid="passwordIsFormValid"
        :onSubmit="changePassword.onSubmit"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import MoleculeCardInfo from "../molecule/MoleculeCardInfo.vue";
import MoleculeForm from "../molecule/MoleculeForm.vue";
import AtomButton from "../atom/AtomButton.vue";
import AtomText from "../atom/AtomText.vue";
import { useProfile } from "../../../composables/useProfile";
import { useEditProfileForm } from "../../../composables/useEditProfileForm";
import { useChangePasswordForm } from "../../../composables/useChangePasswordForm";
import { editProfileInputs, changePasswordInputs } from "../../../utils/configInputs";
import { isFormValid } from "../../../utils/formValidation";
import type { InfoItem } from "../../../utils/types/cards";

export default defineComponent({
  name: "OrganismProfile",
  components: { MoleculeCardInfo, MoleculeForm, AtomButton, AtomText },
  props: { title: { type: String, default: "Meu perfil" } },
  setup() {
    const { user, loading, error, fetchUser } = useProfile();

    const items = computed<InfoItem[]>(() =>
      user.value
        ? [
            { label: "Nome", value: user.value.nome },
            { label: "Email", value: user.value.email },
            {
              label: "Perfil",
              value: user.value.perfil === 2 ? "Admin" : "User",
              type: "chip",
              color: user.value.perfil === 2 ? "purple" : "blue",
            },
            { label: "Status", value: user.value.status, type: "boolean" },
            { label: "Criado em", value: user.value.dataCriacao, type: "date" },
          ]
        : []
    );

    const editDialogOpen = ref(false);
    const passwordDialogOpen = ref(false);

    const editProfile = useEditProfileForm(user, () => {
      editDialogOpen.value = false;
      fetchUser();
    });

    const changePassword = useChangePasswordForm(user, () => {
      passwordDialogOpen.value = false;
      fetchUser();
    });

    const editValues = computed(() => ({
      name: editProfile.name,
      email: editProfile.email,
      currentPassword: editProfile.currentPassword,
    }));

    const passwordValues = computed(() => ({
      newPassword: changePassword.newPassword,
      confirmNewPassword: changePassword.confirmNewPassword,
    }));

    const editIsFormValid = computed(() => isFormValid(editProfileInputs, editValues.value));
    const passwordIsFormValid = computed(() => isFormValid(changePasswordInputs, passwordValues.value));

    const openEditDialog = () => {
      editProfile.resetForm();
      editDialogOpen.value = true;
    };

    const openPasswordDialog = () => {
      changePassword.resetForm();
      passwordDialogOpen.value = true;
    };

    return {
      user,
      loading,
      error,
      items,
      editDialogOpen,
      passwordDialogOpen,
      editProfile,
      changePassword,
      editValues,
      passwordValues,
      editProfileInputs,
      changePasswordInputs,
      editIsFormValid,
      passwordIsFormValid,
      openEditDialog,
      openPasswordDialog,
    };
  },
});
</script>


<style scoped>
.organism-profile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 520px;
}

.organism-profile__header {
  margin-bottom: 24px;
}
</style>
