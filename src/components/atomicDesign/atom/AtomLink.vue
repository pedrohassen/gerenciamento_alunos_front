<template>
  <component
    :is="isRouter ? 'router-link' : 'a'"
    :to="isRouter ? to : undefined"
    :href="!isRouter ? href : undefined"
    :target="target"
    class="atom-link"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'AtomLink',
  props: {
    to: { type: String, default: '' },
    href: { type: String, default: '' },
    target: { type: String, default: '_self' },
  },
  setup(props) {
    const isRouter = computed(() => !!props.to);
    return { isRouter };
  },
});
</script>

<style scoped>
.atom-link {
  color: #1976d2;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}

.atom-link:hover {
  color: #115293;
  text-decoration: underline;
}
</style>
