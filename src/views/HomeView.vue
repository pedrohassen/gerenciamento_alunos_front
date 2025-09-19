<template>
  <AtomoTexto tag="span" size="20px" weight="600" color="#000" class="mt-16">
    Bem vindo!
  </AtomoTexto>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrganismoLayoutPrincipal from '../components/atomicDesign/organism/OrganismoLayoutPrincipal.vue';
import AtomoTexto from '../components/atomicDesign/atom/AtomoTexto.vue';

export default defineComponent({
  components: {
    OrganismoLayoutPrincipal,
    AtomoTexto
  }
});
</script>
