<template>
  <v-app>
    <MoleculeSuperiorMenu :title="title" @toggleDrawer="toggleDrawer">
      <template #actions>
        <AtomButton
          buttonColor="secondary"
          variant="text"
          size="small"
          @click="logout"
        >
          <AtomIcon name="logout" size="18" class="mr-1" />
          {{ logoutText }}
        </AtomButton>
      </template>
    </MoleculeSuperiorMenu>

    <MoleculeLateralMenu v-model="drawerOpen" :itens="navigationItens" @navigate="navigateTo" />

    <v-main>
      <v-container class="layout-container">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MoleculeLateralMenu from '../molecule/MoleculeLateralMenu.vue';
import MoleculeSuperiorMenu from '../molecule/MoleculeSuperiorMenu.vue';
import AtomButton from '../atom/AtomButton.vue';
import AtomIcon from '../atom/AtomIcon.vue';
import { useOrganismPrincipalLayout } from '../../../composables/useOrganismPrincipalLayout';

export default defineComponent({
  name: 'OrganismPrincipalLayout',
  components: { MoleculeSuperiorMenu, MoleculeLateralMenu, AtomButton, AtomIcon },
  props: {
    title: { type: String, default: 'Minha Aplicação' }
  },
  setup() {
    return useOrganismPrincipalLayout();
  }
});
</script>

<style scoped>
.layout-container {
  max-width: 1120px;
  padding: 32px 24px 48px;
}

@media (max-width: 600px) {
  .layout-container {
    padding: 20px 16px 32px;
  }
}
</style>
