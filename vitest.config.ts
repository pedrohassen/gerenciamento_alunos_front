import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: ['node_modules', 'dist'],
      setupFiles: ['./src/test-utils/setup.ts'],
      css: true,
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
    },
  })
)
