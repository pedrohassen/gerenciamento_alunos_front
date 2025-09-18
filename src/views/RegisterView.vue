<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <OrganismoForm mode="register" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrganismoForm from "../components/atomicDesign/organism/OrganismoForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: { OrganismoForm },
});
</script>
