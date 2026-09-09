<template>
  <div class="auth-view">
    <OrganismForm mode="login" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrganismForm from "../components/atomicDesign/organism/OrganismForm.vue";

export default defineComponent({
  name: "LoginView",
  components: { OrganismForm },
});
</script>

<style scoped>
.auth-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
}
</style>
