<template>
  <v-btn
    :disabled="loading"
    :color="color"
    block
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AtomoButton",
  props: {
    color: {
      type: String,
      default: "primary"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"]
});
</script>
