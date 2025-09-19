<template>
  <v-app-bar app color="primary" dark elevate-on-scroll>
    <AtomoButton
      buttonColor="transparent"
      :style="{ minWidth: '40px', width: '40px', height: '40px', padding: 0 }"
      @click="$emit('toggleDrawer')"
    >
      <AtomoIcone nome="menu" cor="#fff" tamanho="24" />
    </AtomoButton>

    <v-toolbar-title>
      <AtomoTexto tag="h1" size="18px" weight="600" color="#fff">
        {{ titulo }}
      </AtomoTexto>
    </v-toolbar-title>
    <v-spacer />

    <v-toolbar-items class="actions-container">
      <slot name="actions" />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AtomoTexto from '../atom/AtomoTexto.vue';
import AtomoIcone from '../atom/AtomoIcone.vue';
import AtomoButton from '../atom/AtomoButton.vue';

export default defineComponent({
  name: 'MoleculaMenuSuperior',
  components: { AtomoTexto, AtomoButton, AtomoIcone },
  props: {
    titulo: {
      type: String,
      default: 'Meu App',
      required: true,
    },
  },
  emits: ['toggleDrawer'],
});
</script>

<style scoped>
.actions-container {
  display: flex;
  font-weight: 600;
  align-items: center;
  padding-right: 100px;
  gap: 12px;
}
</style>
