import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAlunoForm } from "./useAlunoForm";
import { handleSalvarAluno } from "../services/alunoHandlers";
import type { Aluno } from "../utils/types/aluno";

vi.mock("../services/alunoHandlers", () => ({
  handleSalvarAluno: vi.fn(),
}));

const aluno: Aluno = {
  id: 5,
  nome: "Carlos",
  email: "carlos@teste.com",
  curso: "Medicina",
  dataNascimento: "2001-03-15T00:00:00",
  status: true,
  dataCriacao: "2026-01-01T00:00:00",
  dataAtualizacao: "2026-01-01T00:00:00",
};

describe("useAlunoForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("resetForm() sem argumento limpa tudo pro modo de criação", () => {
    const form = useAlunoForm(vi.fn());
    form.resetForm();

    expect(form.id.value).toBeUndefined();
    expect(form.nome.value).toBe("");
    expect(form.email.value).toBe("");
    expect(form.curso.value).toBe("");
    expect(form.dataNascimento.value).toBe("");
    expect(form.status.value).toBe(true);
  });

  it("resetForm(aluno) preenche os campos, cortando a data pra yyyy-MM-dd", () => {
    const form = useAlunoForm(vi.fn());
    form.resetForm(aluno);

    expect(form.id.value).toBe(5);
    expect(form.nome.value).toBe("Carlos");
    expect(form.email.value).toBe("carlos@teste.com");
    expect(form.curso.value).toBe("Medicina");
    expect(form.dataNascimento.value).toBe("2001-03-15");
  });

  it("onSubmit em modo criação chama handleSalvarAluno sem id", () => {
    const onSuccess = vi.fn();
    const form = useAlunoForm(onSuccess);
    form.nome.value = "Novo Aluno";
    form.email.value = "novo@teste.com";
    form.curso.value = "Direito";
    form.dataNascimento.value = "2002-02-02";

    form.onSubmit();

    expect(handleSalvarAluno).toHaveBeenCalledWith(
      {
        id: undefined,
        nome: "Novo Aluno",
        email: "novo@teste.com",
        curso: "Direito",
        dataNascimento: "2002-02-02",
        status: true,
      },
      expect.any(Function),
      onSuccess
    );
  });

  it("onSubmit em modo edição chama handleSalvarAluno com o id do aluno", () => {
    const onSuccess = vi.fn();
    const form = useAlunoForm(onSuccess);
    form.resetForm(aluno);

    form.onSubmit();

    expect(handleSalvarAluno).toHaveBeenCalledWith(
      {
        id: 5,
        nome: "Carlos",
        email: "carlos@teste.com",
        curso: "Medicina",
        dataNascimento: "2001-03-15",
        status: true,
      },
      expect.any(Function),
      onSuccess
    );
  });
});
