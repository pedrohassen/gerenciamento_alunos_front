import { ref } from "vue";
import { handleListarAlunos } from "../services/alunoHandlers";
import type { Aluno } from "../utils/types/aluno";

export const QUANTIDADE_POR_PAGINA = 10;

export function useAlunosList() {
  const alunos = ref<Aluno[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const nomeFiltro = ref("");
  const cursoFiltro = ref("");
  const pagina = ref(0);
  const temProximaPagina = ref(false);

  const fetchAlunos = () => {
    handleListarAlunos(
      {
        nome: nomeFiltro.value || undefined,
        curso: cursoFiltro.value || undefined,
        pular: pagina.value * QUANTIDADE_POR_PAGINA,
        // pede 1 a mais só pra descobrir se existe próxima página, sem exibir esse extra
        quantidade: QUANTIDADE_POR_PAGINA + 1,
      },
      (val) => (loading.value = val),
      (data) => {
        temProximaPagina.value = data.length > QUANTIDADE_POR_PAGINA;
        alunos.value = data.slice(0, QUANTIDADE_POR_PAGINA);
        error.value = null;
      },
      (mensagem) => {
        error.value = mensagem;
      }
    );
  };

  const buscar = () => {
    pagina.value = 0;
    fetchAlunos();
  };

  const proximaPagina = () => {
    pagina.value += 1;
    fetchAlunos();
  };

  const paginaAnterior = () => {
    if (pagina.value === 0) return;
    pagina.value -= 1;
    fetchAlunos();
  };

  return {
    alunos,
    loading,
    error,
    nomeFiltro,
    cursoFiltro,
    pagina,
    temProximaPagina,
    fetchAlunos,
    buscar,
    proximaPagina,
    paginaAnterior,
  };
}
