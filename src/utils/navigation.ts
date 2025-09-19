import type { MenuItem } from "./types/menu";

export const menuItens: MenuItem[] = [
  { text: 'Home', route: { name: 'Home'}, icon: 'home' },
  { text: 'Perfil', route: { name: 'Perfil' }, icon: 'person' },
  { text: 'Alunos', route: { name: 'Alunos' }, icon: 'people' },
];
