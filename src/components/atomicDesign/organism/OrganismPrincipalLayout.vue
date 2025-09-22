<template>
  <v-app>
    <MoleculeSuperiorMenu :title="title" @toggleDrawer="toggleDrawer">
      <template #actions>
        <AtomButton buttonColor="transparent" buttonTextColor="#fff" @click="logout">
          <AtomText tag="span" size="14px" weight="600" color="#fff">
            {{ logoutText }}
          </AtomText>
        </AtomButton>
      </template>
    </MoleculeSuperiorMenu>
    <MoleculeLateralMenu v-model="drawerOpen" :itens="navigationItens" @navigate="navigateTo" />

    <v-main>
      <v-container fluid>
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
import AtomText from '../atom/AtomText.vue';
import { useOrganismPrincipalLayout } from '../../../composables/useOrganismPrincipalLayout';

export default defineComponent({
  name: 'OrganismPrincipalLayout',
  components: { MoleculeSuperiorMenu, MoleculeLateralMenu, AtomButton, AtomText },
  props: {
    title: { type: String, default: 'Minha Aplicação' }
  },
  setup() {
    return useOrganismPrincipalLayout();
  }
});
</script>
