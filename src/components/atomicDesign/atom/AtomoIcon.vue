<template>
  <v-icon
    :class="classeIcone"
    :color="cor"
    :size="tamanho"
    v-on="clicavel ? { click: emitirClique } : {}"
  >
    {{ nome }}
  </v-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AtomoIcon",
  props: {
    classeIcone: { type: String, default: "" },
    tamanho: { type: [Number, String], default: 24 },
    nome: { type: String, required: true },
    cor: { type: String, default: "" },
    clicavel: { type: Boolean, default: false },
  },
  emits: ["click"],
  setup(_props, { emit }) {
    const emitirClique = () => emit("click");
    return { emitirClique };
  },
});
</script>

<style scoped>
.v-icon::after {
  background-color: transparent !important;
}
</style>
