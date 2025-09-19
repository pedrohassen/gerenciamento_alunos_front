<template>
  <v-icon
    :class="classeIcone"
    :color="cor"
    :size="tamanhoNumber"
    v-on="clicavel ? { click: emitirClique } : {}"
  >
    {{ nome }}
  </v-icon>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "AtomoIcone",
  props: {
    classeIcone: { type: String, default: "" },
    tamanho: { type: [Number, String], default: 24 },
    nome: { type: String, required: true },
    cor: { type: String, default: "" },
    clicavel: { type: Boolean, default: false },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const emitirClique = () => emit("click");
    const tamanhoNumber = computed(() => Number(props.tamanho) || 24);
    return { emitirClique, tamanhoNumber };
  },
});
</script>

<style scoped>
.v-icon::after {
  background-color: transparent !important;
}
</style>
