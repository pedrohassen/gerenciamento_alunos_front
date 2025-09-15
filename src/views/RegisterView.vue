<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <MoleculaRegisterForm />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoleculaRegisterForm from "../components/atomicDesign/molecule/MoleculaRegisterForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: { MoleculaRegisterForm },
});
</script>
