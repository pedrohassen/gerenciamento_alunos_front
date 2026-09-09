<template>
  <div class="auth-shell">
    <aside class="auth-brand">
      <div class="auth-brand__top">
        <span class="auth-brand__logo">
          <span class="auth-brand__logo-mark" aria-hidden="true"></span>
          LearningLoop
        </span>
      </div>

      <div class="auth-brand__body">
        <h2 class="auth-brand__headline">
          Gestão acadêmica sem planilhas soltas.
        </h2>
        <p class="auth-brand__text">
          Cadastro de alunos, controle de turmas e acompanhamento de matrículas
          em um único painel.
        </p>
      </div>

      <p class="auth-brand__foot">Sistema de gerenciamento de alunos</p>
    </aside>

    <div class="auth-panel">
      <div class="auth-panel__inner">
        <MoleculeForm
          flat
          :pageTitle="pageTitle"
          :title="title"
          :buttonText="buttonText"
          buttonTextColor="white"
          buttonColor="primary"
          :inputs="inputs"
          :values="values"
          :loading="loading"
          :isFormValid="isFormValid"
          :onSubmit="onSubmit"
        >
          <template #actions>
            <MoleculeTextLink
              v-if="mode === 'login'"
              text="Não tem conta?"
              linkText="Cadastre-se"
              to="/register"
            />
            <MoleculeTextLink
              v-else
              text="Já tem conta?"
              linkText="Faça login"
              to="/login"
            />
          </template>
        </MoleculeForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoleculeForm from "../molecule/MoleculeForm.vue";
import { useOrganismForm } from "../../../composables/useOrganismForm";
import MoleculeTextLink from "../molecule/MoleculeTextLink.vue";

export default defineComponent({
  name: "OrganismForm",
  components: { MoleculeForm, MoleculeTextLink },
  props: { mode: { type: String, required: true } },
  setup(props) {
    return useOrganismForm(props.mode as "login" | "register");
  },
});
</script>

<style scoped>
.auth-shell {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  width: min(1040px, 100%);
  min-height: min(640px, calc(100vh - 48px));
  margin: 24px auto;
  background-color: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px -30px rgba(15, 43, 39, 0.28);
}

.auth-brand {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  padding: 44px;
  color: #eef3f1;
  background:
    radial-gradient(120% 80% at 100% 0%, #14806b 0%, transparent 55%),
    linear-gradient(160deg, #0f6e5c 0%, #0b4c40 100%);
}

.auth-brand__logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.auth-brand__logo-mark {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: inset 0 0 0 3px #0f6e5c, 0 0 0 3px rgba(255, 255, 255, 0.28);
}

.auth-brand__headline {
  font-size: 1.7rem;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 14px;
  max-width: 20ch;
}

.auth-brand__text {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(238, 243, 241, 0.82);
  max-width: 34ch;
}

.auth-brand__foot {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(238, 243, 241, 0.62);
}

.auth-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 44px;
}

.auth-panel__inner {
  width: 100%;
  max-width: 380px;
}

@media (max-width: 860px) {
  .auth-shell {
    grid-template-columns: 1fr;
    min-height: 0;
    width: min(440px, 100%);
    margin: 16px auto;
  }

  .auth-brand {
    padding: 32px;
    gap: 24px;
  }

  .auth-brand__body {
    display: none;
  }

  .auth-brand__foot {
    display: none;
  }

  .auth-panel {
    padding: 32px;
  }

  .auth-panel__inner {
    max-width: 100%;
  }
}
</style>
