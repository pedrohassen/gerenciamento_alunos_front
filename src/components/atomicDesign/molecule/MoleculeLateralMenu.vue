<template>
  <v-navigation-drawer
    v-model="open"
    temporary
    :width="$vuetify.display.smAndUp ? 200 : 300"
    :clipped="$vuetify.display.smAndUp"
  >
    <v-list density="compact" class="menu-list">
      <v-list-item
        v-for="item in itens"
        :key="item.text"
        @click="$emit('navigate', item.route)"
        class="menu-item"
      >
        <template #prepend>
          <AtomIcon :name="item.icon || 'help_outline'" size="20" color="#000" />
        </template>

        <AtomText tag="span" size="14px" weight="500" class="ml-3">
          {{ item.text }}
        </AtomText>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue';
import AtomText from '../atom/AtomText.vue';
import AtomIcon from '../atom/AtomIcon.vue';
import type { MenuItem } from '../../../utils/types/menu';

export default defineComponent({
  name: 'MoleculeLateralMenu',
  components: { AtomText, AtomIcon },
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

    watch(open, (val) => emit('update:modelValue', val));
    watch(() => props.modelValue, (val) => (open.value = val));

    return { open };
  },
});
</script>

<style scoped>
.menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
</style>
