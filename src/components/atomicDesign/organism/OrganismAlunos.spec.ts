import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import OrganismAlunos from "./OrganismAlunos.vue";
import type { Aluno } from "../../../utils/types/aluno";

const vuetify = createVuetify({ components, directives });

const mockAlunos = ref<Aluno[]>([]);
const mockLoading = ref(false);
const mockError = ref<string | null>(null);
const mockNomeFiltro = ref("");
const mockCursoFiltro = ref("");
const mockPagina = ref(0);
const mockTemProximaPagina = ref(false);
const mockFetchAlunos = vi.fn();
const mockBuscar = vi.fn();
const mockProximaPagina = vi.fn();
const mockPaginaAnterior = vi.fn();

vi.mock("../../../composables/useAlunosList", () => ({
  useAlunosList: () => ({
    alunos: mockAlunos,
    loading: mockLoading,
    error: mockError,
    nomeFiltro: mockNomeFiltro,
    cursoFiltro: mockCursoFiltro,
    pagina: mockPagina,
    temProximaPagina: mockTemProximaPagina,
    fetchAlunos: mockFetchAlunos,
    buscar: mockBuscar,
    proximaPagina: mockProximaPagina,
    paginaAnterior: mockPaginaAnterior,
  }),
}));

vi.mock("../../../composables/useAlunoForm", () => ({
  useAlunoForm: () => ({
    id: ref(undefined),
    nome: ref(""),
    email: ref(""),
    curso: ref(""),
    dataNascimento: ref(""),
    status: ref(true),
    loading: ref(false),
    resetForm: vi.fn(),
    onSubmit: vi.fn(),
  }),
}));

vi.mock("../../../services/alunoHandlers", () => ({
  handleDeletarAluno: vi.fn(),
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

function mountAlunos() {
  return mount(OrganismAlunos as any, {
    global: { plugins: [vuetify] },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockAlunos.value = [];
  mockLoading.value = false;
  mockError.value = null;
  mockNomeFiltro.value = "";
  mockCursoFiltro.value = "";
  mockPagina.value = 0;
  mockTemProximaPagina.value = false;
});

describe("OrganismAlunos", () => {
  it("busca a lista de alunos ao montar", () => {
    mountAlunos();
    expect(mockFetchAlunos).toHaveBeenCalled();
  });

  it("mostra o spinner de carregamento quando loading=true e a lista está vazia", () => {
    mockLoading.value = true;
    const wrapper = mountAlunos();
    expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
  });

  it("mostra o alerta de erro quando error está preenchido", () => {
    mockError.value = "Erro ao carregar alunos";
    const wrapper = mountAlunos();
    expect(wrapper.text()).toContain("Erro ao carregar alunos");
  });

  it("mostra 'Nenhum aluno cadastrado ainda' quando a lista está vazia sem filtro nem paginação", () => {
    const wrapper = mountAlunos();
    expect(wrapper.text()).toContain("Nenhum aluno cadastrado ainda.");
  });

  it("mostra 'Nenhum aluno encontrado para esse filtro' quando há filtro ativo e lista vazia", () => {
    mockNomeFiltro.value = "Zzz";
    const wrapper = mountAlunos();
    expect(wrapper.text()).toContain("Nenhum aluno encontrado para esse filtro.");
  });

  it("mostra 'Não há mais alunos para exibir' quando está em página > 0 e vazia", () => {
    mockPagina.value = 1;
    const wrapper = mountAlunos();
    expect(wrapper.text()).toContain("Não há mais alunos para exibir.");
  });

  it("renderiza a tabela com os alunos quando a lista não está vazia", () => {
    mockAlunos.value = [alunoFixture(1), alunoFixture(2)];
    const wrapper = mountAlunos();
    expect(wrapper.text()).toContain("Aluno 1");
    expect(wrapper.text()).toContain("Aluno 2");
  });

  it("botão Próxima fica desabilitado quando temProximaPagina é false", () => {
    mockAlunos.value = [alunoFixture(1)];
    mockTemProximaPagina.value = false;
    const wrapper = mountAlunos();
    const nextButton = wrapper.findAll("button").find((b) => b.text() === "Próxima");
    expect((nextButton!.element as HTMLButtonElement).disabled).toBe(true);
  });

  it("botão Próxima fica habilitado quando temProximaPagina é true", () => {
    mockAlunos.value = [alunoFixture(1)];
    mockTemProximaPagina.value = true;
    const wrapper = mountAlunos();
    const nextButton = wrapper.findAll("button").find((b) => b.text() === "Próxima");
    expect((nextButton!.element as HTMLButtonElement).disabled).toBe(false);
  });
});
