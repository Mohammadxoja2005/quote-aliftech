import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RandomQuoteView from '../views/RandomQuoteView.vue'
import CreateQuoteView from "../views/CreateQuoteView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/random',
      name: 'random',
      component: RandomQuoteView
    },
    {
      path: '/create',
      name: 'createQuote',
      component: CreateQuoteView
    }
  ]
})

export default router
