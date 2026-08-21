import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleListarAlunos, handleSalvarAluno, handleDeletarAluno } from "./alunoHandlers";
import { listarAlunos, criarAluno, atualizarAluno, deletarAluno } from "./alunoService";
import type { Aluno } from "../utils/types/aluno";

vi.mock("./alunoService", () => ({
  listarAlunos: vi.fn(),
  criarAluno: vi.fn(),
  atualizarAluno: vi.fn(),
  deletarAluno: vi.fn(),
}));

const aluno: Aluno = {
  id: 1,
  nome: "Ana",
  email: "ana@teste.com",
  curso: "Engenharia",
  dataNascimento: "2000-01-01T00:00:00",
  status: true,
  dataCriacao: "2026-01-01T00:00:00",
  dataAtualizacao: "2026-01-01T00:00:00",
};

describe("handleListarAlunos", () => {
  let setLoading: (val: boolean) => void;
  let onSuccess: (alunos: Aluno[]) => void;
  let onError: (mensagem: string) => void;

  beforeEach(() => {
    vi.clearAllMocks();
    setLoading = vi.fn<(val: boolean) => void>();
    onSuccess = vi.fn<(alunos: Aluno[]) => void>();
    onError = vi.fn<(mensagem: string) => void>();
  });

  it("chama onSuccess com a lista retornada", async () => {
    (listarAlunos as any).mockResolvedValue([aluno]);

    await handleListarAlunos({}, setLoading, onSuccess, onError);

    expect(onSuccess).toHaveBeenCalledWith([aluno]);
    expect(onError).not.toHaveBeenCalled();
  });

  it("regressão: trata 404 (busca sem resultado) como lista vazia, não como erro", async () => {
    (listarAlunos as any).mockRejectedValue({
      response: { status: 404, data: { mensagem: "Nenhum aluno encontrado." } },
    });

    await handleListarAlunos({ nome: "Zzz" }, setLoading, onSuccess, onError);

    expect(onSuccess).toHaveBeenCalledWith([]);
    expect(onError).not.toHaveBeenCalled();
  });

  it("chama onError com a mensagem do backend pra outros códigos de erro", async () => {
    (listarAlunos as any).mockRejectedValue({
      response: { status: 500, data: { mensagem: "Erro interno" } },
    });

    await handleListarAlunos({}, setLoading, onSuccess, onError);

    expect(onError).toHaveBeenCalledWith("Erro interno");
    expect(onSuccess).not.toHaveBeenCalled();
  });
});

describe("handleSalvarAluno", () => {
  let setLoading: (val: boolean) => void;
  let onSuccess: () => void;
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    setLoading = vi.fn<(val: boolean) => void>();
    onSuccess = vi.fn<() => void>();
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("chama criarAluno quando o payload não tem id", async () => {
    (criarAluno as any).mockResolvedValue(aluno);

    await handleSalvarAluno(
      { nome: "Ana", email: "ana@teste.com", curso: "Engenharia", dataNascimento: "2000-01-01" },
      setLoading,
      onSuccess
    );

    expect(criarAluno).toHaveBeenCalled();
    expect(atualizarAluno).not.toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it("chama atualizarAluno quando o payload tem id", async () => {
    (atualizarAluno as any).mockResolvedValue(aluno);

    await handleSalvarAluno(
      { id: 1, nome: "Ana", email: "ana@teste.com", curso: "Engenharia", dataNascimento: "2000-01-01" },
      setLoading,
      onSuccess
    );

    expect(atualizarAluno).toHaveBeenCalled();
    expect(criarAluno).not.toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it("bloqueia quando a data de nascimento é futura, sem chamar a API", async () => {
    const futuro = new Date();
    futuro.setFullYear(futuro.getFullYear() + 1);

    await handleSalvarAluno(
      {
        nome: "Ana",
        email: "ana@teste.com",
        curso: "Engenharia",
        dataNascimento: futuro.toISOString().slice(0, 10),
      },
      setLoading,
      onSuccess
    );

    expect(criarAluno).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining("Erro no formulário"));
  });
});

describe("handleDeletarAluno", () => {
  it("exclui e chama onSuccess", async () => {
    (deletarAluno as any).mockResolvedValue(aluno);
    const setLoading = vi.fn<(val: boolean) => void>();
    const onSuccess = vi.fn<() => void>();

    await handleDeletarAluno(1, setLoading, onSuccess);

    expect(deletarAluno).toHaveBeenCalledWith(1);
    expect(onSuccess).toHaveBeenCalled();
  });

  it("mostra a mensagem de erro real quando falha", async () => {
    (deletarAluno as any).mockRejectedValue({ response: { data: { mensagem: "Aluno não encontrado." } } });
    const setLoading = vi.fn<(val: boolean) => void>();
    const onSuccess = vi.fn<() => void>();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    await handleDeletarAluno(999, setLoading, onSuccess);

    expect(alertSpy).toHaveBeenCalledWith("Falha ao excluir aluno: Aluno não encontrado.");
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
