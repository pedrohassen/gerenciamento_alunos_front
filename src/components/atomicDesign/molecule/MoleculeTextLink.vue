<template>
  <div class="text-link">
    <AtomText tag="span" class="text-link__label">{{ text }}</AtomText>
    <AtomLink :to="to" class="text-link__link">{{ linkText }}</AtomLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AtomText from "../atom/AtomText.vue";
import AtomLink from "../atom/AtomLink.vue";

export default defineComponent({
  name: "MoleculeTextLink",
  components: { AtomText, AtomLink },
  props: {
    text: { type: String, required: true },
    linkText: { type: String, required: true },
    to: { type: String, required: true },
  },
});
</script>

<style scoped>
.text-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  font-size: 0.875rem;
}

.text-link__label {
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.text-link__link {
  font-weight: 600;
}
</style>
