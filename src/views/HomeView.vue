<template>
  <section class="home">
    <header class="home__header">
      <AtomText tag="p" class="home__eyebrow">LearningLoop</AtomText>
      <AtomText tag="h1" class="text-h4 font-weight-bold d-block">
        Bem-vindo de volta
      </AtomText>
      <AtomText tag="p" class="text-body-1 text-medium-emphasis d-block mt-2">
        Acompanhe alunos e mantenha seus dados sempre atualizados a partir do
        painel.
      </AtomText>
    </header>

    <div class="home__grid">
      <v-card
        v-for="card in cards"
        :key="card.title"
        class="home__card pa-5"
        link
        @click="go(card.route)"
      >
        <span class="home__card-icon">
          <AtomIcon :name="card.icon" size="22" color="primary" />
        </span>
        <AtomText tag="h2" class="text-subtitle-1 font-weight-bold d-block mt-4">
          {{ card.title }}
        </AtomText>
        <AtomText tag="p" class="text-body-2 text-medium-emphasis d-block mt-1">
          {{ card.description }}
        </AtomText>
      </v-card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import AtomText from '../components/atomicDesign/atom/AtomText.vue';
import AtomIcon from '../components/atomicDesign/atom/AtomIcon.vue';
import { getUserRoleFromToken } from '../services/tokenService';

interface HomeCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  adminOnly?: boolean;
}

export default defineComponent({
  name: 'HomeView',
  components: { AtomText, AtomIcon },
  setup() {
    const router = useRouter();
    const isAdmin = getUserRoleFromToken() === 'ADMIN';

    const allCards: HomeCard[] = [
      {
        title: 'Meu perfil',
        description: 'Revise seus dados de acesso e altere sua senha.',
        icon: 'person',
        route: '/perfil',
      },
      {
        title: 'Alunos',
        description: 'Cadastre, edite e acompanhe os alunos registrados.',
        icon: 'people',
        route: '/alunos',
        adminOnly: true,
      },
    ];

    const cards = computed(() => allCards.filter((c) => !c.adminOnly || isAdmin));

    const go = (route: string) => router.push(route);

    return { cards, go };
  },
});
</script>

<style scoped>
.home__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 6px;
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 32px;
}

.home__card {
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.home__card:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  transform: translateY(-2px);
}

.home__card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style>
