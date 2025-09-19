<template>
  <v-app>
    <MoleculaMenuSuperior :titulo="titulo" @toggleDrawer="toggleDrawer">
      <template #actions>
        <AtomoButton buttonColor="transparent" buttonTextColor="#fff" @click="logout">
          <AtomoText tag="span" size="14px" weight="600" color="#fff">
            {{ logoutText }}
          </AtomoText>
        </AtomoButton>
      </template>
    </MoleculaMenuSuperior>
    <MoleculaMenuLateral v-model="drawerOpen" :itens="navigationItens" @navigate="navigateTo" />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter, type RouteLocationRaw } from 'vue-router';
import MoleculaMenuLateral from '../molecule/MoleculaMenuLateral.vue';
import MoleculaMenuSuperior from '../molecule/MoleculaMenuSuperior.vue';
import { menuItens } from '../../../utils/navigation';
import { handleLogout } from '../../../services/authHandlers';
import AtomoButton from '../atom/AtomoButton.vue';
import AtomoText from '../atom/AtomoText.vue';

export default defineComponent({
  name: 'OrganismoLayoutPrincipal',
  components: { MoleculaMenuSuperior, MoleculaMenuLateral, AtomoButton, AtomoText },
  props: {
    titulo: { type: String, default: 'Minha Aplicação' }
  },
  setup() {
    const drawerOpen = ref(false);

    const toggleDrawer = () => {
      drawerOpen.value = !drawerOpen.value;
    };

    const logoutText = 'Sair';
    const logout = handleLogout;

    const navigationItens = menuItens;

    const router = useRouter();

    const navigateTo = async (rota: RouteLocationRaw) => {
      try {
        if (rota) {
          await router.push(rota);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        alert('Erro ao navegar para a rota:' + message);
      }
    };

    return { drawerOpen, toggleDrawer, navigateTo, navigationItens, logoutText, logout };
  }
});
</script>
