<template>
  <v-app>
    <v-main>
      <v-container>
        <AtomoTexto class="text-h4">Bem-vindo ao Gerenciamento de Alunos!</AtomoTexto>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AtomoTexto from '../components/atomicDesign/atom/AtomoTexto.vue';

export default defineComponent({
  components: {
    AtomoTexto
  }
});
</script>
