<template>
  <OrganismPrincipalLayout title="Gerenciamento de Alunos" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrganismPrincipalLayout from '../components/atomicDesign/organism/OrganismPrincipalLayout.vue';

export default defineComponent({
  name: 'PrincipalView',
  components: { OrganismPrincipalLayout }
});
</script>
