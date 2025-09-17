<template>
  <MoleculaForm
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
      <MoleculaTextoLink
        v-if="mode === 'login'"
        text="Não tem conta?"
        linkText="Cadastre-se"
        to="/register"
      />
      <MoleculaTextoLink
        v-else
        text="Já tem conta?"
        linkText="Faça login"
        to="/login"
      />
    </template>
  </MoleculaForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoleculaForm from "../molecule/MoleculaForm.vue";
import { useOrganismoForm } from "../../../composables/useOrganismoForm";
import MoleculaTextoLink from "../molecule/MoleculaTextoLink.vue";

export default defineComponent({
  name: "OrganismoForm",
  components: { MoleculaForm, MoleculaTextoLink },
  props: { mode: { type: String, required: true } },
  setup(props) {
    return useOrganismoForm(props.mode as "login" | "register");
  },
});
</script>

<style>
.center {
  display: flex;
  justify-content: center;
}
</style>
