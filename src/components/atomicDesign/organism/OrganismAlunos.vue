<template>
  <div class="organism-alunos">
    <div class="filtros">
      <AtomInput v-model="nomeFiltro" type="text" placeholder="Buscar por nome" class="filtro-input" />
      <AtomInput v-model="cursoFiltro" type="text" placeholder="Buscar por curso" class="filtro-input" />
      <AtomButton @click="buscar">Buscar</AtomButton>
      <AtomButton buttonColor="#006400" @click="openCreateDialog">Novo Aluno</AtomButton>
    </div>

    <v-progress-circular v-if="loading && alunos.length === 0" indeterminate color="primary" class="mt-8" />

    <v-alert v-else-if="error" type="error" class="mt-4">
      {{ error }}
    </v-alert>

    <template v-else>
      <v-alert v-if="alunos.length === 0" type="info" class="mt-4">
        {{ mensagemListaVazia }}
      </v-alert>

      <MoleculeAlunosTable
        v-else
        :alunos="alunos"
        @editar="openEditDialog"
        @excluir="openDeleteDialog"
      />

      <div class="paginacao">
        <AtomButton :disabled="pagina === 0" @click="paginaAnterior">Anterior</AtomButton>
        <AtomButton :disabled="!temProximaPagina" @click="proximaPagina">Próxima</AtomButton>
      </div>
    </template>

    <v-dialog v-model="formDialogOpen" max-width="450">
      <MoleculeForm
        :pageTitle="formTitle"
        title=""
        buttonText="Salvar"
        width="100%"
        :inputs="alunoInputs"
        :values="formValues"
        :loading="alunoForm.loading.value"
        :isFormValid="formIsValid"
        :onSubmit="alunoForm.onSubmit"
      />
    </v-dialog>

    <v-dialog v-model="deleteDialogOpen" max-width="400">
      <v-card class="pa-4">
        <v-card-title>Excluir aluno</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir {{ alunoParaExcluir?.nome }}?
        </v-card-text>
        <v-card-actions>
          <AtomButton @click="deleteDialogOpen = false">Cancelar</AtomButton>
          <AtomButton buttonColor="red" :loading="deleting" @click="confirmarExclusao">Excluir</AtomButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import MoleculeAlunosTable from "../molecule/MoleculeAlunosTable.vue";
import MoleculeForm from "../molecule/MoleculeForm.vue";
import AtomButton from "../atom/AtomButton.vue";
import AtomInput from "../atom/AtomInput.vue";
import { useAlunosList } from "../../../composables/useAlunosList";
import { useAlunoForm } from "../../../composables/useAlunoForm";
import { handleDeletarAluno } from "../../../services/alunoHandlers";
import { alunoInputs } from "../../../utils/configInputs";
import { isFormValid } from "../../../utils/formValidation";
import type { Aluno } from "../../../utils/types/aluno";

export default defineComponent({
  name: "OrganismAlunos",
  components: { MoleculeAlunosTable, MoleculeForm, AtomButton, AtomInput },
  setup() {
    const {
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
    } = useAlunosList();

    fetchAlunos();

    const mensagemListaVazia = computed(() => {
      if (nomeFiltro.value || cursoFiltro.value) {
        return "Nenhum aluno encontrado para esse filtro.";
      }
      if (pagina.value > 0) {
        return "Não há mais alunos para exibir.";
      }
      return "Nenhum aluno cadastrado ainda.";
    });

    const formDialogOpen = ref(false);

    const alunoForm = useAlunoForm(() => {
      formDialogOpen.value = false;
      fetchAlunos();
    });

    const formValues = computed(() => ({
      nome: alunoForm.nome,
      email: alunoForm.email,
      curso: alunoForm.curso,
      dataNascimento: alunoForm.dataNascimento,
    }));

    const formIsValid = computed(() => isFormValid(alunoInputs, formValues.value));
    const formTitle = computed(() => (alunoForm.id.value ? "Editar Aluno" : "Novo Aluno"));

    const openCreateDialog = () => {
      alunoForm.resetForm();
      formDialogOpen.value = true;
    };

    const openEditDialog = (aluno: Aluno) => {
      alunoForm.resetForm(aluno);
      formDialogOpen.value = true;
    };

    const deleteDialogOpen = ref(false);
    const alunoParaExcluir = ref<Aluno | null>(null);
    const deleting = ref(false);

    const openDeleteDialog = (aluno: Aluno) => {
      alunoParaExcluir.value = aluno;
      deleteDialogOpen.value = true;
    };

    const confirmarExclusao = () => {
      if (!alunoParaExcluir.value) return;
      handleDeletarAluno(alunoParaExcluir.value.id, (val) => (deleting.value = val), () => {
        deleteDialogOpen.value = false;
        fetchAlunos();
      });
    };

    return {
      alunos,
      loading,
      error,
      nomeFiltro,
      cursoFiltro,
      pagina,
      temProximaPagina,
      buscar,
      proximaPagina,
      paginaAnterior,
      mensagemListaVazia,
      formDialogOpen,
      alunoForm,
      formValues,
      formIsValid,
      formTitle,
      alunoInputs,
      openCreateDialog,
      openEditDialog,
      deleteDialogOpen,
      alunoParaExcluir,
      deleting,
      openDeleteDialog,
      confirmarExclusao,
    };
  },
});
</script>

<style scoped>
.organism-alunos {
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
}

.filtros {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filtro-input {
  max-width: 220px;
}

.paginacao {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
}
</style>
