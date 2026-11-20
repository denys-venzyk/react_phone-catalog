import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "src/styles/utils/globalColors.scss" as *;
          @use "src/styles/utils/globalTextStyles.scss" as *;
          @use "src/styles/utils/mixins.scss" as *;
        `,
      },
    },
  },
});
