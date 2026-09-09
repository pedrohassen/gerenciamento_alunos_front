<template>
  <v-text-field
    :model-value="modelValue"
    :type="type"
    :label="placeholder"
    :placeholder="placeholder"
    :rules="rules"
    hide-details="auto"
    @update:model-value="onInput"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "AtomInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    rules: {
      type: Array as PropType<((value: any) => true | string)[]>,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(_props, { emit }) {
    const onInput = (value: string) => {
      emit("update:modelValue", value);
    };

    return { onInput };
  },
});
</script>
