import api from "../api/axios";
import type { Aluno } from "../utils/types/aluno";

export type AlunoFiltros = {
  nome?: string;
  curso?: string;
  pular?: number;
  quantidade?: number;
};

export type AlunoPayload = {
  id?: number;
  nome: string;
  email: string;
  dataNascimento: string;
  curso: string;
  status?: boolean;
};

export async function listarAlunos(filtros: AlunoFiltros): Promise<Aluno[]> {
  const response = await api.get("/aluno", { params: filtros });
  return response.data;
}

export async function criarAluno(payload: AlunoPayload): Promise<Aluno> {
  const response = await api.post("/aluno", payload);
  return response.data;
}

export async function atualizarAluno(payload: AlunoPayload): Promise<Aluno> {
  const response = await api.put("/aluno", payload);
  return response.data;
}

export async function deletarAluno(id: number): Promise<Aluno> {
  const response = await api.delete(`/aluno/${id}`);
  return response.data;
}
