import { createPinia } from 'pinia'
import { createApp, watch } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
