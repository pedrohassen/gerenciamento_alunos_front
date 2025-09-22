<template>
  <AtomText tag="span" size="20px" weight="600" color="#000" class="mt-16">
    Bem vindo!
  </AtomText>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AtomText from '../components/atomicDesign/atom/AtomText.vue';

export default defineComponent({
  components: {
    AtomText
  }
});
</script>
