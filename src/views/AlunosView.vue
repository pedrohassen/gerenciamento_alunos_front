<template>
  <OrganismAlunos />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrganismAlunos from '../components/atomicDesign/organism/OrganismAlunos.vue';

export default defineComponent({
  name: 'AlunosView',
  components: { OrganismAlunos }
});
</script>
