import { ref } from "vue";
import { handleSalvarAluno } from "../services/alunoHandlers";
import type { Aluno } from "../utils/types/aluno";

export function useAlunoForm(onSuccess: () => void) {
  const id = ref<number | undefined>(undefined);
  const nome = ref("");
  const email = ref("");
  const curso = ref("");
  const dataNascimento = ref("");
  const status = ref(true);
  const loading = ref(false);

  const resetForm = (aluno?: Aluno) => {
    id.value = aluno?.id;
    nome.value = aluno?.nome ?? "";
    email.value = aluno?.email ?? "";
    curso.value = aluno?.curso ?? "";
    dataNascimento.value = aluno?.dataNascimento?.slice(0, 10) ?? "";
    status.value = aluno?.status ?? true;
  };

  const onSubmit = () =>
    handleSalvarAluno(
      {
        id: id.value,
        nome: nome.value,
        email: email.value,
        curso: curso.value,
        dataNascimento: dataNascimento.value,
        status: status.value,
      },
      (val: boolean) => (loading.value = val),
      onSuccess
    );

  return { id, nome, email, curso, dataNascimento, status, loading, resetForm, onSubmit };
}
