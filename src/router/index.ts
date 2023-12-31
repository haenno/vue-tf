import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import TasksView from '../views/TasksView.vue'
import InboxView from '../views/InboxView.vue'
import LogoutView from '../views/LogoutView.vue'
import RegisterView from '../views/RegisterView.vue'

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
      path: '/news',
      name: 'news',
      meta: {
        requiresLoggedInUser: false,
        hideForAuth: false
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
      meta: {
        requiresLoggedInUser: true,
        hideForAuth: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView,
      meta: {
        requiresLoggedInUser: false,
        hideForAuth: true
      }
    }
  ]
})

export default router
