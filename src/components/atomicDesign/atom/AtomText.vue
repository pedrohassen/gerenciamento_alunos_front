<template>
  <component :is="tag" :style="styles">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'AtomText',
  props: {
    tag: { type: String, default: 'span' },
    size: { type: String, default: '14px' },
    weight: { type: String, default: '400' },
    color: { type: String, default: '#000' },
  },
  setup(props) {
    const styles = computed(() => ({
      fontSize: props.size,
      fontWeight: props.weight,
      color: props.color,
    }));
    return { styles };
  },
});
</script>
