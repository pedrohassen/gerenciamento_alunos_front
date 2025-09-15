<template>
  <v-text-field
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    class="classic-input"
    @input="onInput"
    :rules="rules"
    outlined
    dense
    hide-details="auto"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "AtomoInput",
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
    }
  },
  emits: ["update:modelValue"],
  setup(_props, { emit }) {
    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        emit("update:modelValue", target.value);
      }
    };

    return { onInput };
  },
});
</script>

<style scoped>
.classic-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.classic-input:focus {
  border-color: #1976d2;
  box-shadow: 0 0 4px rgba(25, 118, 210, 0.3);
}

.classic-input-error {
  border-color: #f44336;
}
</style>

