import { ref } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import { handleLogout } from "../services/authHandlers";
import { menuItens } from "../utils/navigation";

export function useOrganismPrincipalLayout() {
  const drawerOpen = ref(false);
  const router = useRouter();

  const toggleDrawer = () => {
    drawerOpen.value = !drawerOpen.value;
  };

  const loading = ref(false);
  const logoutText = "Sair";

  const logout = () => {
    handleLogout((val) => {
      loading.value = val;
    });
  };

  const navigationItens = menuItens;

  const navigateTo = async (rota: RouteLocationRaw) => {
    try {
      if (rota) {
        await router.push(rota);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert("Erro ao navegar para a rota:" + message);
    }
  };

  return {
    drawerOpen,
    toggleDrawer,
    navigationItens,
    navigateTo,
    logout,
    logoutText,
    loading,
  };
}
