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
      <MoleculaTextLink
        v-if="mode === 'login'"
        text="Não tem conta?"
        linkText="Cadastre-se"
        to="/register"
      />
      <MoleculaTextLink
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
import MoleculaTextLink from "../molecule/MoleculaTextLink.vue";

export default defineComponent({
  name: "OrganismoForm",
  components: { MoleculaForm, MoleculaTextLink },
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
