/*
 * @Author: FunJust
 * @Date: 2022-04-26 21:19:40
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 别名
      'comps': path.resolve(__dirname, 'src/components'), // 别名
      'apis': path.resolve(__dirname, 'src/apis'), // 别名
      'views': path.resolve(__dirname, 'src/views'), // 别名
      'styles': path.resolve(__dirname, 'src/styles'), // 别名
      'assets': path.resolve(__dirname, 'src/assets') // 别名
    },
  },
  plugins: [vue()]
})
