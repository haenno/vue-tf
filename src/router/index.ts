import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import TasksView from '../views/TasksView.vue'
import InboxView from '../views/InboxView.vue'
//import { useUserAuthStore } from '@/stores/UserAuth'

//const userAuthStore = useUserAuthStore()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresLoggedInUser: false,
        hideForAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresLoggedInUser: false,
        hideForAuth: true
      }
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: InboxView,
      meta: {
        requiresLoggedInUser: true,
        hideForAuth: false
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: {
        requiresLoggedInUser: true,
        hideForAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresLoggedInUser: false,
        hideForAuth: false
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
