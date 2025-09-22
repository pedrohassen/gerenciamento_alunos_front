<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <OrganismForm mode="register" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrganismForm from "../components/atomicDesign/organism/OrganismForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: { OrganismForm },
});
</script>
