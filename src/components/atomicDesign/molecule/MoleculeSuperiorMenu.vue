<template>
  <v-app-bar app color="primary" dark elevate-on-scroll>
    <AtomButton
      buttonColor="transparent"
      :style="{ minWidth: '40px', width: '40px', height: '40px', padding: 0 }"
      @click="$emit('toggleDrawer')"
    >
      <AtomIcon name="menu" color="#fff" size="24" />
    </AtomButton>

    <v-toolbar-title>
      <AtomText tag="h1" size="18px" weight="600" color="#fff">
        {{ title }}
      </AtomText>
    </v-toolbar-title>
    <v-spacer />

    <v-toolbar-items class="actions-container">
      <slot name="actions" />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AtomText from '../atom/AtomText.vue';
import AtomIcon from '../atom/AtomIcon.vue';
import AtomButton from '../atom/AtomButton.vue';

export default defineComponent({
  name: 'MoleculeSuperiorMenu',
  components: { AtomText, AtomButton, AtomIcon },
  props: {
    title: {
      type: String,
      default: 'Meu App',
      required: true,
    },
  },
  emits: ['toggleDrawer'],
});
</script>

<style scoped>
.actions-container {
  display: flex;
  font-weight: 600;
  align-items: center;
  padding-right: 100px;
  gap: 12px;
}
</style>
