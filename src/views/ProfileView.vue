<template>
  <OrganismProfile title="Perfil" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrganismProfile from '../components/atomicDesign/organism/OrganismProfile.vue';

export default defineComponent({
  name: 'ProfileView',
  components: { OrganismProfile }
});
</script>