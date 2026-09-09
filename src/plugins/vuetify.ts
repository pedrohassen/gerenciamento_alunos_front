import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, md } from 'vuetify/iconsets/md';

const learningLoop = {
  dark: false,
  colors: {
    background: '#f5f7f6',
    surface: '#ffffff',
    'surface-bright': '#ffffff',
    'surface-light': '#eef1f0',
    'surface-variant': '#3a4a46',
    'on-surface-variant': '#eef1f0',
    primary: '#0f6e5c',
    'primary-darken-1': '#0b5648',
    secondary: '#37474f',
    'secondary-darken-1': '#26343a',
    accent: '#2563eb',
    error: '#c62828',
    info: '#0277bd',
    success: '#2e7d32',
    warning: '#ef6c00',
    'on-background': '#1b2b27',
    'on-surface': '#1b2b27',
  },
  variables: {
    'border-color': '#1b2b27',
    'border-opacity': 0.09,
    'high-emphasis-opacity': 0.88,
    'medium-emphasis-opacity': 0.6,
    'theme-on-surface': '#1b2b27',
    'shadow-key-umbra-opacity': 0.04,
    'shadow-key-penumbra-opacity': 0.03,
    'shadow-key-ambient-opacity': 0.05,
  },
};

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: { md },
  },
  theme: {
    defaultTheme: 'learningLoop',
    themes: { learningLoop },
  },
  defaults: {
    global: {
      ripple: true,
    },
    VCard: {
      rounded: 'lg',
      elevation: 0,
      border: true,
    },
    VBtn: {
      rounded: 'lg',
      flat: true,
      class: 'text-none',
      style: 'letter-spacing: normal;',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      hideDetails: 'auto' as const,
    },
    VAlert: {
      rounded: 'lg',
      variant: 'tonal',
    },
    VChip: {
      rounded: 'lg',
    },
    VNavigationDrawer: {
      elevation: 0,
    },
    VAppBar: {
      flat: true,
    },
  },
});
