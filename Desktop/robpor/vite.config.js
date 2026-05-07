import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *;\n@use "@/styles/mixins" as *;\n`,
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
