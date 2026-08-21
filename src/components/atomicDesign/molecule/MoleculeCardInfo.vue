<template>
  <v-card class="pa-6 mx-auto info-card" max-width="500" elevation="2">
    <v-card-title v-if="title" class="text-h5 text-center">
      <AtomText tag="h5">{{ title }}</AtomText>
    </v-card-title>

    <v-divider v-if="title" class="mb-4"></v-divider>

    <v-card-text>
      <div v-for="item in items" :key="item.label" class="info-row">
        <AtomText tag="span" class="label">{{ item.label }}:</AtomText>

        <template v-if="item.type === 'chip'">
          <v-chip :color="item.color || 'primary'" small class="ml-2">
            {{ item.value }}
          </v-chip>
        </template>

        <template v-else-if="item.type === 'boolean'">
          <v-chip :color="item.value ? 'green' : 'red'" small class="ml-2">
            {{ item.value ? 'Active' : 'Inactive' }}
          </v-chip>
        </template>

        <template v-else-if="item.type === 'date'">
          <AtomText tag="span" class="value">{{ formatDate(item.value) }}</AtomText>
        </template>

        <template v-else>
          <AtomText tag="span" class="value">{{ item.value }}</AtomText>
        </template>
      </div>
    </v-card-text>

    <v-card-actions class="justify-center">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AtomText from "../atom/AtomText.vue";
import { format } from "date-fns";
import type { InfoItem } from "../../../utils/types/cards";

export default defineComponent({
  name: "MoleculeCardInfo",
  components: { AtomText },
  props: {
    title: { type: String, required: false },
    items: { type: Array as () => InfoItem[], required: true },
  },
  methods: {
    formatDate(date: string | Date) {
      return format(new Date(date), "dd/MM/yyyy HH:mm");
    },
  },
});
</script>

<style scoped>
.info-card {
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.label {
  font-weight: 500;
  color: #555;
}

.value {
  color: #333;
}
</style>
