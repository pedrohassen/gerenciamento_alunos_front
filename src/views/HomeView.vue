<template>
  <AtomoText tag="span" size="20px" weight="600" color="#000" class="mt-16">
    Bem vindo!
  </AtomoText>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AtomoText from '../components/atomicDesign/atom/AtomoText.vue';

export default defineComponent({
  components: {
    AtomoText
  }
});
</script>
