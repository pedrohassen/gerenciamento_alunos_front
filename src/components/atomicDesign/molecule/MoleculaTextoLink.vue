<template>
  <div class="d-flex align-center justify-center w-100">
    <AtomoTexto tag="span" class="tamanho-fonte">{{ text }}</AtomoTexto>
    <AtomoLink :to="to" class="ml-2 tamanho-fonte">{{ linkText }}</AtomoLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AtomoTexto from "../atom/AtomoTexto.vue";
import AtomoLink from "../atom/AtomoLink.vue";

export default defineComponent({
  name: "MoleculaTextoLink",
  components: { AtomoTexto, AtomoLink },
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
