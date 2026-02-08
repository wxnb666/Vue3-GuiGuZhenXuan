import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // 允许外部访问，可选
    port: 5173, // 默认端口，可选
    proxy: {
      // 以 /api 开头的请求都会走这个代理
      '/api': {
        target: 'http://192.168.1.31:3000', // 后端服务器地址
        changeOrigin: true, // 需要虚拟主机站点才能启用
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
