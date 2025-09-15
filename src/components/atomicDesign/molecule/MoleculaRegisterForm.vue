<template>
  <v-card class="pa-8" max-width="400">
    <v-card-title class="text-h5">
      <AtomoTexto tag="span" class="text-h5">Cadastro de Usuário</AtomoTexto>
    </v-card-title>

    <v-card-text>
      <form @submit.prevent="handleRegister">
        <AtomoInput
          v-model="nome"
          type="text"
          placeholder="Nome"
          :rules="nameRules"
          class="mb-4"
        />

        <AtomoInput
          v-model="email"
          type="email"
          placeholder="Email"
          :rules="emailRules"
          class="mb-4"
        />

        <AtomoInput
          v-model="password"
          type="password"
          placeholder="Senha"
          :rules="passwordRules"
          class="mb-4"
        />

        <AtomoInput
          v-model="confirmPassword"
          type="password"
          placeholder="Confirmar Senha"
          :rules="confirmPasswordRules"
          class="mb-4"
        />

        <AtomoButton
          :loading="loading"
          type="submit"
          color="primary"
          block
        >
          Cadastrar
        </AtomoButton>
      </form>
    </v-card-text>

    <v-card-actions>
      <AtomoTexto>Já tem conta?</AtomoTexto>
      <AtomoLink to="/login" class="ml-2" isRouter>
        Faça login
      </AtomoLink>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Cookies from "js-cookie";
import AtomoInput from "../atom/AtomoInput.vue";
import AtomoButton from "../atom/AtomoButton.vue";
import AtomoLink from "../atom/AtomoLink.vue";
import AtomoTexto from "../atom/AtomoTexto.vue";
import api from "../../../api/axios";
import { makeRule, registerSchema } from "../../../utils/validationSchema";

export default defineComponent({
  name: "MoleculaRegisterForm",
  components: { AtomoInput, AtomoButton, AtomoLink, AtomoTexto },
  setup() {
    const nome = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);
    const nameRules = [makeRule(registerSchema, "nome")];
    const emailRules = [makeRule(registerSchema, "email")];
    const passwordRules = [makeRule(registerSchema, "password")];
    const confirmPasswordRules = [makeRule(registerSchema, "confirmPassword")];

    const handleRegister = async () => {
      if (!nome.value || !email.value || !password.value || !confirmPassword.value) return;

      try {
        loading.value = true;
        const response = await api.post("/Usuario/registrar", {
          nome: nome.value,
          email: email.value,
          senha: password.value,
        });

        Cookies.set("token", response.data.token, { expires: 1 });
        window.location.href = "/home";
      } catch (err: any) {
        alert("Falha no cadastro: " + (err.response?.data?.message || err.message));
      } finally {
        loading.value = false;
      }
    };

    return { nome, email, password, confirmPassword, loading, handleRegister, nameRules, emailRules, passwordRules, confirmPasswordRules };
  },
});
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.ml-2 {
  margin-left: 8px;
}
</style>
