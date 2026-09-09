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
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}

.atom-link:hover {
  color: rgb(var(--v-theme-primary-darken-1));
  text-decoration: underline;
}
</style>
