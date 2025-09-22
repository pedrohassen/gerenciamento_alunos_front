import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PrincipalView from '../views/PrincipalView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: "/login", name: "Login", component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  {
    path: '/',
    component: PrincipalView,
    children: [
      { path: 'home', name: 'Home', component: HomeView },
      { path: 'perfil', name: 'Perfil', component: HomeView },
      { path: 'alunos', name: 'Alunos', component: HomeView },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
