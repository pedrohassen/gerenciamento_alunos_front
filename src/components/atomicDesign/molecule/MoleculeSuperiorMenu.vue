<template>
  <v-app-bar flat color="surface" height="64" class="superior-menu">
    <div class="superior-menu__content">
      <div class="superior-menu__left">
        <AtomButton
          v-if="!mdAndUp"
          buttonColor="transparent"
          variant="text"
          :style="{ minWidth: '40px', width: '40px', height: '40px', padding: 0 }"
          @click="$emit('toggleDrawer')"
        >
          <AtomIcon name="menu" size="24" />
        </AtomButton>

        <span class="superior-menu__brand">
          <span class="superior-menu__brand-mark" aria-hidden="true"></span>
          <AtomText tag="span" class="superior-menu__brand-name">LearningLoop</AtomText>
        </span>
      </div>

      <div class="superior-menu__actions">
        <slot name="actions" />
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDisplay } from 'vuetify';
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
  setup() {
    const { mdAndUp } = useDisplay();
    return { mdAndUp };
  },
});
</script>

<style scoped>
.superior-menu {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.superior-menu__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 12px 0 8px;
  gap: 12px;
}

.superior-menu__left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.superior-menu__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding-left: 8px;
}

.superior-menu__brand-mark {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  box-shadow: inset 0 0 0 3px #ffffff, 0 0 0 2px rgba(var(--v-theme-primary), 0.22);
}

.superior-menu__brand-name {
  font-weight: 700;
  font-size: 1.02rem;
  letter-spacing: -0.01em;
  color: rgb(var(--v-theme-on-surface));
}

.superior-menu__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
