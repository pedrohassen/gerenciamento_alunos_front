import type { RouteLocationRaw } from "vue-router";

export type MenuItem = {
  text: string;
  icon?: string;
  route: RouteLocationRaw;
};
