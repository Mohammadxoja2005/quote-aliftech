import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateQuoteView from "../views/CreateQuoteView.vue"
import DetailView from "../views/DetailView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'createQuote',
      component: CreateQuoteView
    },
    {
      path: '/detail/:id',
      name: 'detailView',
      component: DetailView
    },
  ]
})

export default router
