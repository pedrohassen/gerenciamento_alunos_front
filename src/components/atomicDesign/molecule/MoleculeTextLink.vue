<template>
  <div class="d-flex align-center justify-center w-100">
    <AtomText tag="span" class="tamanho-fonte">{{ text }}</AtomText>
    <AtomLink :to="to" class="ml-2 tamanho-fonte">{{ linkText }}</AtomLink>
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
.tamanho-fonte {
  font-size: 18px !important;
}
</style>
