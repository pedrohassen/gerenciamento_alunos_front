<template>
  <v-btn
    :loading="loading"
    :disabled="disabled"
    :color="buttonColor"
    :variant="variant"
    :size="size"
    :style="buttonTextColor ? { color: buttonTextColor } : undefined"
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

type ButtonVariant = "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";

export default defineComponent({
  name: "AtomButton",
  props: {
    buttonColor: {
      type: String,
      default: "primary",
    },
    buttonTextColor: {
      type: String,
      default: "",
    },
    variant: {
      type: String as PropType<ButtonVariant>,
      default: "flat",
    },
    size: {
      type: String,
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
});
</script>
