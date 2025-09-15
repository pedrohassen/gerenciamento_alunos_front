<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <MoleculaLoginForm />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoleculaLoginForm from "../components/atomicDesign/molecule/MoleculaLoginForm.vue";

export default defineComponent({
  name: "LoginView",
  components: { MoleculaLoginForm },
});
</script>
