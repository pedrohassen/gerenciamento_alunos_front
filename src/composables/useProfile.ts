import { ref, onMounted } from "vue";
import api from "../api/axios";

export function useProfile(userId: number) {
  const user = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchUser = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get(`/usuario/${userId}`);
      user.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.mensagem || "Erro ao carregar perfil";
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchUser);

  return { user, loading, error, fetchUser };
}
