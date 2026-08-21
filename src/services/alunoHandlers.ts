import { listarAlunos, criarAluno, atualizarAluno, deletarAluno } from "./alunoService";
import type { AlunoFiltros, AlunoPayload } from "./alunoService";
import type { Aluno } from "../utils/types/aluno";
import { alunoSchema } from "../utils/validationSchema";

function extractErrorMessage(err: any, fallback: string): string {
  if (err?.issues) {
    return "Erro no formulário: " + err.issues.map((e: any) => e.message).join(", ");
  }
  return fallback + ": " + (err.response?.data?.mensagem || err.message);
}

export const handleListarAlunos = async (
  filtros: AlunoFiltros,
  setLoading: (val: boolean) => void,
  onSuccess: (alunos: Aluno[]) => void,
  onError: (mensagem: string) => void
) => {
  setLoading(true);
  try {
    const alunos = await listarAlunos(filtros);
    onSuccess(alunos);
  } catch (err: any) {
    // A API retorna 404 quando a busca não encontra nenhum aluno — não é um erro, é lista vazia.
    if (err.response?.status === 404) {
      onSuccess([]);
    } else {
      onError(err.response?.data?.mensagem || "Erro ao carregar alunos");
    }
  } finally {
    setLoading(false);
  }
};

export const handleSalvarAluno = async (
  payload: AlunoPayload,
  setLoading: (val: boolean) => void,
  onSuccess: () => void
) => {
  setLoading(true);
  try {
    alunoSchema.parse({
      nome: payload.nome,
      email: payload.email,
      curso: payload.curso,
      dataNascimento: payload.dataNascimento,
    });

    if (payload.id) {
      await atualizarAluno(payload);
    } else {
      await criarAluno(payload);
    }
    onSuccess();
  } catch (err: any) {
    alert(extractErrorMessage(err, "Falha ao salvar aluno"));
  } finally {
    setLoading(false);
  }
};

export const handleDeletarAluno = async (
  id: number,
  setLoading: (val: boolean) => void,
  onSuccess: () => void
) => {
  setLoading(true);
  try {
    await deletarAluno(id);
    onSuccess();
  } catch (err: any) {
    alert(extractErrorMessage(err, "Falha ao excluir aluno"));
  } finally {
    setLoading(false);
  }
};
