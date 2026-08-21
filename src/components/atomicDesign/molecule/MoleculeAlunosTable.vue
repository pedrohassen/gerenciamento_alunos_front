<template>
  <v-table class="alunos-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Curso</th>
        <th>Data de Nascimento</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="aluno in alunos" :key="aluno.id">
        <td><AtomText tag="span">{{ aluno.nome }}</AtomText></td>
        <td><AtomText tag="span">{{ aluno.email }}</AtomText></td>
        <td><AtomText tag="span">{{ aluno.curso }}</AtomText></td>
        <td><AtomText tag="span">{{ formatDate(aluno.dataNascimento) }}</AtomText></td>
        <td class="acoes">
          <AtomButton buttonColor="primary" @click="$emit('editar', aluno)">Editar</AtomButton>
          <AtomButton buttonColor="red" @click="$emit('excluir', aluno)">Excluir</AtomButton>
        </td>
      </tr>
    </tbody>
  </v-table>
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
.alunos-table {
  width: 100%;
}

.acoes {
  display: flex;
  gap: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
