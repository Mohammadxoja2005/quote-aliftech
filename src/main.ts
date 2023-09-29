import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import VueRx from 'vue-rx';

const app = createApp(App)

app.use(router)
app.use(store)
// Vue.use(VueRx)

app.mount('#app')
