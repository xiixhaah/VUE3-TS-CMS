import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

console.log('222')
