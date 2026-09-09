<template>
  <v-navigation-drawer
    v-model="open"
    :permanent="mdAndUp"
    :temporary="!mdAndUp"
    width="256"
    class="lateral-menu"
  >
    <div class="lateral-menu__section">Navegação</div>

    <v-list nav density="comfortable" class="lateral-menu__list">
      <v-list-item
        v-for="item in itens"
        :key="item.text"
        :active="isActive(item)"
        active-color="primary"
        rounded="lg"
        class="lateral-menu__item"
        @click="$emit('navigate', item.route)"
      >
        <template #prepend>
          <AtomIcon :name="item.icon || 'chevron_right'" size="20" />
        </template>

        <v-list-item-title class="lateral-menu__label">
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
import AtomIcon from '../atom/AtomIcon.vue';
import type { MenuItem } from '../../../utils/types/menu';

export default defineComponent({
  name: 'MoleculeLateralMenu',
  components: { AtomIcon },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    itens: {
      type: Array as PropType<MenuItem[]>,
      default: () => [],
      required: true,
    },
  },
  emits: ['navigate', 'update:modelValue'],
  setup(props, { emit }) {
    const open = ref(props.modelValue);
    const route = useRoute();
    const { mdAndUp } = useDisplay();

    watch(open, (val) => emit('update:modelValue', val));
    watch(() => props.modelValue, (val) => (open.value = val));

    const isActive = (item: MenuItem) => {
      const target = item.route as { name?: string } | undefined;
      return !!target?.name && route.name === target.name;
    };

    return { open, mdAndUp, isActive };
  },
});
</script>

<style scoped>
.lateral-menu {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.lateral-menu__section {
  padding: 20px 20px 8px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.5);
}

.lateral-menu__list {
  padding: 4px 12px;
}

.lateral-menu__item {
  margin-bottom: 2px;
  min-height: 44px;
}

.lateral-menu__label {
  font-size: 0.92rem;
  font-weight: 500;
}
</style>
