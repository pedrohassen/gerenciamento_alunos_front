<template>
  <v-navigation-drawer
    v-model="open"
    temporary
    :width="$vuetify.display.smAndUp ? 200 : 300"
    :clipped="$vuetify.display.smAndUp"
  >
    <v-list dense class="menu-list">
      <v-list-item v-for="item in itens" :key="item.text" @click="$emit('navigate', item.route)" class="menu-item">
        <v-list-item-icon>
          <AtomoIcon :nome="item.icon || 'help_outline'" tamanho="20" cor="#000" />
        </v-list-item-icon>
        <v-list-item-content class="ml-3">
          <AtomoText tag="span" size="14px" weight="500">
            {{ item.text }}
          </AtomoText>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue';
import AtomoText from '../atom/AtomoText.vue';
import AtomoIcon from '../atom/AtomoIcon.vue';
import type { MenuItem } from '../../../utils/types/menu';

export default defineComponent({
  name: 'MoleculaMenuLateral',
  components: { AtomoText, AtomoIcon },
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
    watch(() => props.modelValue, (val) => open.value = val);

    return { open };
  }
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