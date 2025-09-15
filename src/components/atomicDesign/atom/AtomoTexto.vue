<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'AtomoTexto',
  props: {
    size: { type: String, default: '14px' },
    weight: { type: String, default: '400' },
    color: { type: String, default: '#000' },
  },
  setup(props) {
    const classes = computed(() => ({
      style: {
        fontSize: props.size,
        fontWeight: props.weight,
        color: props.color,
      },
    }));
    return { classes };
  },
});
</script>
