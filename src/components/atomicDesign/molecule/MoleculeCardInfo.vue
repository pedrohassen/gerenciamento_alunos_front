<template>
  <v-card class="pa-0 info-card" max-width="520">
    <div v-if="title" class="info-card__header">
      <AtomText tag="h2" class="text-h6 font-weight-bold">{{ title }}</AtomText>
    </div>

    <div class="info-card__body">
      <div v-for="item in items" :key="item.label" class="info-row">
        <AtomText tag="span" class="info-row__label">{{ item.label }}</AtomText>

        <template v-if="item.type === 'chip'">
          <v-chip :color="item.color || 'primary'" variant="tonal" size="small">
            {{ item.value }}
          </v-chip>
        </template>

        <template v-else-if="item.type === 'boolean'">
          <v-chip :color="item.value ? 'success' : 'error'" variant="tonal" size="small">
            {{ item.value ? 'Ativo' : 'Inativo' }}
          </v-chip>
        </template>

        <template v-else-if="item.type === 'date'">
          <AtomText tag="span" class="info-row__value">{{ formatDate(item.value) }}</AtomText>
        </template>

        <template v-else>
          <AtomText tag="span" class="info-row__value">{{ item.value }}</AtomText>
        </template>
      </div>
    </div>

    <div v-if="$slots.actions" class="info-card__actions">
      <slot name="actions"></slot>
    </div>
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
      return format(new Date(date), "dd/MM/yyyy 'às' HH:mm");
    },
  },
});
</script>

<style scoped>
.info-card {
  width: 100%;
}

.info-card__header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.info-card__body {
  padding: 8px 24px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
}

.info-row + .info-row {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.info-row__label {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.55);
}

.info-row__value {
  font-size: 0.95rem;
  color: rgb(var(--v-theme-on-surface));
  text-align: right;
}

.info-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 24px 20px;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
