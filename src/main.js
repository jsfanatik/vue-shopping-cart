import { createPinia } from 'pinia'
import { createApp, watch } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const pinia = createPinia()

if (localStorage.getItem("state")) {
  pinia.state.value = JSON.parse(localStorage.getItem("state"))
  // console.log(pinia.state.value)
}

//handles setting Pinia state in localStorage
watch (pinia.state, (state) => {
  localStorage.setItem("state", JSON.stringify(state))
}, {deep: true})

createApp(App).use(router).use(pinia).mount('#app')
