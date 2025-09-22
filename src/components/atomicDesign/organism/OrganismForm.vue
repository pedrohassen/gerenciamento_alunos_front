<template>
  <MoleculeForm
    :pageTitle="pageTitle"
    :title="title"
    :buttonText="buttonText"
    buttonTextColor="white"
    buttonColor="#006400"
    :inputs="inputs"
    :values="values"
    :loading="loading"
    :isFormValid="isFormValid"
    :onSubmit="onSubmit"
  >
    <template #actions>
      <MoleculeTextLink
        v-if="mode === 'login'"
        text="Não tem conta?"
        linkText="Cadastre-se"
        to="/register"
      />
      <MoleculeTextLink
        v-else
        text="Já tem conta?"
        linkText="Faça login"
        to="/login"
      />
    </template>
  </MoleculeForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoleculeForm from "../molecule/MoleculeForm.vue";
import { useOrganismForm } from "../../../composables/useOrganismForm";
import MoleculeTextLink from "../molecule/MoleculeTextLink.vue";

export default defineComponent({
  name: "OrganismForm",
  components: { MoleculeForm, MoleculeTextLink },
  props: { mode: { type: String, required: true } },
  setup(props) {
    return useOrganismForm(props.mode as "login" | "register");
  },
});
</script>

<style>
.center {
  display: flex;
  justify-content: center;
}
</style>
