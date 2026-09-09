<template>
  <v-card :flat="flat" :border="!flat" :class="flat ? 'pa-0' : 'pa-6 pa-sm-8'" :width="width">
    <div class="form-heading">
      <AtomText tag="h1" class="text-h5 font-weight-bold d-block">{{ pageTitle }}</AtomText>
      <AtomText
        v-if="title"
        tag="p"
        class="text-body-2 text-medium-emphasis d-block mt-1"
      >
        {{ title }}
      </AtomText>
    </div>

    <v-card-text class="pa-0 mt-6">
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
          size="large"
          class="mt-2"
          block
        >
          {{ buttonText }}
        </AtomButton>
      </form>
    </v-card-text>

    <v-card-actions v-if="$slots.actions" class="pa-0 mt-4 justify-center">
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
    width: { type: String, default: "100%" },
    flat: { type: Boolean, default: false },
    inputs: { type: Array as PropType<InputConfig[]>, required: true },
    values: { type: Object as PropType<Record<string, any>>, required: true },
    loading: { type: Boolean, required: true },
    isFormValid: { type: Boolean, default: false },
    onSubmit: { type: Function as PropType<() => void>, required: true },
  },
});
</script>
