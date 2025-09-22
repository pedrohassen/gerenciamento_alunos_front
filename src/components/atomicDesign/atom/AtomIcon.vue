<template>
  <v-icon
    :class="classIcon"
    :color="color"
    :size="size"
    v-on="clickable ? { click: emitClick } : {}"
  >
    {{ name }}
  </v-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AtomIcon",
  props: {
    classIcon: { type: String, default: "" },
    size: { type: [Number, String], default: 24 },
    name: { type: String, required: true },
    color: { type: String, default: "" },
    clickable: { type: Boolean, default: false },
  },
  emits: ["click"],
  setup(_props, { emit }) {
    const emitClick = () => emit("click");
    return { emitClick };
  },
});
</script>

<style scoped>
.v-icon::after {
  background-color: transparent !important;
}
</style>
