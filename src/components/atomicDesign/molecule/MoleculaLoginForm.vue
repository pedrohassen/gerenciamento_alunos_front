<template>
  <v-card class="pa-8" max-width="400">
    <v-card-title class="text-h5">
      <AtomoTexto tag="span" class="text-h5">Login</AtomoTexto>
    </v-card-title>

    <v-card-text>
      <form @submit.prevent="handleLogin">
        <AtomoInput
          v-model="email"
          type="text"
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

        <AtomoButton
          :loading="loading"
          type="submit"
          color="primary"
          block
        >
          Entrar
        </AtomoButton>
      </form>
    </v-card-text>

    <v-card-actions class="d-flex align-center">
      <AtomoTexto tag="span">Não tem conta?</AtomoTexto>
      <AtomoLink to="/register" class="ml-2">Cadastre-se</AtomoLink>
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
import { loginSchema, makeRule } from "../../../utils/validationSchema";

export default defineComponent({
  name: "MoleculaLoginForm",
  components: { AtomoInput, AtomoButton, AtomoLink, AtomoTexto },
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const emailRules = [makeRule(loginSchema, "email")];
    const passwordRules = [makeRule(loginSchema, "password")];

    const handleLogin = async () => {
      if (!email.value || !password.value) return;

      try {
        loading.value = true;
        const response = await api.post("/Usuario/login", {
          email: email.value,
          senha: password.value,
        });

        Cookies.set("token", response.data.token, { expires: 1 });
        window.location.href = "/home";
      } catch (err: any) {
        alert("Falha no login: " + (err.response?.data?.message || err.message));
      } finally {
        loading.value = false;
      }
    };

    return { email, password, loading, handleLogin, emailRules, passwordRules };
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
