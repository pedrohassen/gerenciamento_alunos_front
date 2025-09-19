<template>
  <OrganismoLayoutPrincipal titulo="Gerenciamento de Alunos" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrganismoLayoutPrincipal from '../components/atomicDesign/organism/OrganismoLayoutPrincipal.vue';

export default defineComponent({
  name: 'ViewPrincipal',
  components: { OrganismoLayoutPrincipal }
});
</script>
