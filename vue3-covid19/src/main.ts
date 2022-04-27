/*
 * @Author: FunJust
 * @Date: 2022-04-26 21:19:40
 * @Description: 
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
