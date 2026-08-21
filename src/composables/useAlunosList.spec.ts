import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAlunosList, QUANTIDADE_POR_PAGINA } from "./useAlunosList";
import { handleListarAlunos } from "../services/alunoHandlers";
import type { Aluno } from "../utils/types/aluno";

vi.mock("../services/alunoHandlers", () => ({
  handleListarAlunos: vi.fn(),
}));

function alunoFixture(id: number): Aluno {
  return {
    id,
    nome: `Aluno ${id}`,
    email: `aluno${id}@teste.com`,
    curso: "Curso",
    dataNascimento: "2000-01-01T00:00:00",
    status: true,
    dataCriacao: "2026-01-01T00:00:00",
    dataAtualizacao: "2026-01-01T00:00:00",
  };
}

describe("useAlunosList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("busca a primeira página pedindo QUANTIDADE_POR_PAGINA + 1 itens (peek-ahead), pular=0", () => {
    const { fetchAlunos } = useAlunosList();
    fetchAlunos();

    expect(handleListarAlunos).toHaveBeenCalledWith(
      { nome: undefined, curso: undefined, pular: 0, quantidade: QUANTIDADE_POR_PAGINA + 1 },
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("marca temProximaPagina=true e corta a lista quando vem 1 item a mais que o tamanho da página", () => {
    (handleListarAlunos as any).mockImplementation((_filtros: any, _setLoading: any, onSuccess: any) => {
      const extra = Array.from({ length: QUANTIDADE_POR_PAGINA + 1 }, (_, i) => alunoFixture(i + 1));
      onSuccess(extra);
    });

    const { alunos, temProximaPagina, fetchAlunos } = useAlunosList();
    fetchAlunos();

    expect(alunos.value).toHaveLength(QUANTIDADE_POR_PAGINA);
    expect(temProximaPagina.value).toBe(true);
  });

  it("marca temProximaPagina=false quando vem no máximo o tamanho da página", () => {
    (handleListarAlunos as any).mockImplementation((_filtros: any, _setLoading: any, onSuccess: any) => {
      onSuccess([alunoFixture(1), alunoFixture(2)]);
    });

    const { alunos, temProximaPagina, fetchAlunos } = useAlunosList();
    fetchAlunos();

    expect(alunos.value).toHaveLength(2);
    expect(temProximaPagina.value).toBe(false);
  });

  it("onError preenche error com a mensagem recebida", () => {
    (handleListarAlunos as any).mockImplementation((_filtros: any, _setLoading: any, _onSuccess: any, onError: any) => {
      onError("Deu ruim");
    });

    const { error, fetchAlunos } = useAlunosList();
    fetchAlunos();

    expect(error.value).toBe("Deu ruim");
  });

  it("buscar() reseta a página pra 0 e refaz a busca com os filtros atuais", () => {
    const { nomeFiltro, pagina, buscar } = useAlunosList();
    pagina.value = 3;
    nomeFiltro.value = "Ana";

    buscar();

    expect(pagina.value).toBe(0);
    expect(handleListarAlunos).toHaveBeenCalledWith(
      expect.objectContaining({ nome: "Ana", pular: 0 }),
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("proximaPagina() incrementa a página e busca com o pular correspondente", () => {
    const { pagina, proximaPagina } = useAlunosList();
    proximaPagina();

    expect(pagina.value).toBe(1);
    expect(handleListarAlunos).toHaveBeenLastCalledWith(
      expect.objectContaining({ pular: QUANTIDADE_POR_PAGINA }),
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("paginaAnterior() não deixa a página ficar negativa nem busca de novo", () => {
    const { pagina, paginaAnterior } = useAlunosList();
    paginaAnterior();

    expect(pagina.value).toBe(0);
    expect(handleListarAlunos).not.toHaveBeenCalled();
  });

  it("paginaAnterior() decrementa a página quando não está na primeira", () => {
    const { pagina, proximaPagina, paginaAnterior } = useAlunosList();
    proximaPagina();
    vi.clearAllMocks();

    paginaAnterior();

    expect(pagina.value).toBe(0);
    expect(handleListarAlunos).toHaveBeenCalledWith(
      expect.objectContaining({ pular: 0 }),
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    );
  });
});
