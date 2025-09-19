<template>
  <v-btn
    :loading="loading"
    :disabled="disabled"
    :color="buttonColor"
    :style="{ color: buttonTextColor }"
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
    buttonColor: {
      type: String,
      default: "primary"
    },
    buttonTextColor: {
      type: String,
      default: "white"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"]
});
</script>
