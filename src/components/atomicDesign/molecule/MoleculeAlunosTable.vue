<template>
  <v-card class="alunos-table-card pa-0">
    <v-table class="alunos-table" hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Curso</th>
          <th>Nascimento</th>
          <th class="text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aluno in alunos" :key="aluno.id">
          <td>
            <AtomText tag="span" class="font-weight-medium">{{ aluno.nome }}</AtomText>
          </td>
          <td><AtomText tag="span" class="text-medium-emphasis">{{ aluno.email }}</AtomText></td>
          <td><AtomText tag="span">{{ aluno.curso }}</AtomText></td>
          <td><AtomText tag="span">{{ formatDate(aluno.dataNascimento) }}</AtomText></td>
          <td class="acoes">
            <AtomButton
              buttonColor="secondary"
              variant="text"
              size="small"
              @click="$emit('editar', aluno)"
            >
              Editar
            </AtomButton>
            <AtomButton
              buttonColor="error"
              variant="text"
              size="small"
              @click="$emit('excluir', aluno)"
            >
              Excluir
            </AtomButton>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import AtomText from "../atom/AtomText.vue";
import AtomButton from "../atom/AtomButton.vue";
import { format } from "date-fns";
import type { Aluno } from "../../../utils/types/aluno";

export default defineComponent({
  name: "MoleculeAlunosTable",
  components: { AtomText, AtomButton },
  props: {
    alunos: { type: Array as PropType<Aluno[]>, required: true },
  },
  emits: ["editar", "excluir"],
  methods: {
    formatDate(date: string) {
      // Data de nascimento é uma data de calendário, não um instante — extrai os
      // componentes direto da string e monta em horário local pra não sofrer
      // deslocamento de fuso (new Date("yyyy-MM-dd") é interpretado como UTC).
      const [year, month, day] = date.slice(0, 10).split("-").map(Number);
      return format(new Date(year, month - 1, day), "dd/MM/yyyy");
    },
  },
});
</script>

<style scoped>
.alunos-table-card {
  overflow: hidden;
}

.alunos-table {
  width: 100%;
}

.alunos-table :deep(thead th) {
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.55) !important;
  background-color: rgb(var(--v-theme-surface-light));
}

.alunos-table :deep(tbody td) {
  height: 56px;
}

.text-right {
  text-align: right;
}

.acoes {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}
</style>
