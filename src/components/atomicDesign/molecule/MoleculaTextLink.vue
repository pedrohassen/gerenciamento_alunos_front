<template>
  <div class="d-flex align-center justify-center w-100">
    <AtomoText tag="span" class="tamanho-fonte">{{ text }}</AtomoText>
    <AtomoLink :to="to" class="ml-2 tamanho-fonte">{{ linkText }}</AtomoLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AtomoText from "../atom/AtomoText.vue";
import AtomoLink from "../atom/AtomoLink.vue";

export default defineComponent({
  name: "MoleculaTextLink",
  components: { AtomoText, AtomoLink },
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
