import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // 配置样式按需导入插件
    createStyleImportPlugin({
      resolves: [
        // 自动导入 Element Plus 样式
        ElementPlusResolve()
      ],
      // 可选：指定需要处理的文件类型（默认已包含常见类型）
      include: ['**/*.vue', '**/*.ts', '**/*.js']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置 less 预处理器（Element Plus 依赖）
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true // 允许 less 中执行 JS，解决 Element Plus 样式解析问题
      }
    }
  }
})
