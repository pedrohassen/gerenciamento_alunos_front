import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PrincipalView from '../views/PrincipalView.vue';
import ProfileView from '../views/ProfileView.vue';
import AlunosView from '../views/AlunosView.vue';
import { isTokenExpired, getUserRoleFromToken } from '../services/tokenService';

const routes = [
  { path: '/', redirect: '/login' },
  { path: "/login", name: "Login", component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  {
    path: '/',
    component: PrincipalView,
    meta: { requiresAuth: true },
    children: [
      { path: 'home', name: 'Home', component: HomeView },
      { path: 'perfil', name: 'Perfil', component: ProfileView },
      { path: 'alunos', name: 'Alunos', component: AlunosView, meta: { requiresAdmin: true } },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && isTokenExpired()) {
    return '/login';
  }

  if (to.matched.some((record) => record.meta.requiresAdmin) && getUserRoleFromToken() !== 'ADMIN') {
    return '/home';
  }

  return true;
});

export default router;
