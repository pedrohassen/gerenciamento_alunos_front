<template>
  <v-card class="pa-4" width="40%">
    <v-card-title>
      <AtomText tag="h1" class="text-h5">{{ pageTitle }}</AtomText>
    </v-card-title>

    <v-card-title>
      <AtomText tag="h2" class="text-h6">{{ title }}</AtomText>
    </v-card-title>

    <v-card-text class="pa-0">
      <form @submit.prevent="onSubmit">
        <AtomInput
          v-for="input in inputs"
          :key="input.name"
          v-model="values[input.name].value"
          :type="input.type"
          :placeholder="input.placeholder"
          :rules="input.rules"
          class="mb-4"
        />

        <AtomButton
          :loading="loading"
          :disabled="!isFormValid"
          type="submit"
          :buttonTextColor="buttonTextColor"
          :buttonColor="buttonColor"
          block
        >
          {{ buttonText }}
        </AtomButton>
      </form>
    </v-card-text>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import AtomInput from "../atom/AtomInput.vue";
import AtomButton from "../atom/AtomButton.vue";
import AtomText from "../atom/AtomText.vue";
import type { InputConfig } from "../../../utils/types/inputs";

export default defineComponent({
  name: "MoleculeForm",
  components: { AtomInput, AtomButton, AtomText },
  props: {
    pageTitle: { type: String, required: true },
    title: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonTextColor: { type: String, default: "white" },
    buttonColor: { type: String, default: "primary" },
    inputs: { type: Array as PropType<InputConfig[]>, required: true },
    values: { type: Object as PropType<Record<string, any>>, required: true },
    loading: { type: Boolean, required: true },
    isFormValid: { type: Boolean, default: false },
    onSubmit: { type: Function as PropType<() => void>, required: true },
  },
});
</script>

<style scoped>
.page-title-container {
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
