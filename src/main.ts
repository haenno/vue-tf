import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import type { RouteLocationNormalized } from 'vue-router'

import { useUserAuthStore } from '@/stores/UserAuth'

import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin, {
  // One of the options
  position: 'bottom',
  dismissible: true
})

app.mount('#app')

const userAuthStore = useUserAuthStore()
// Darkmode start

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  themeToggleLightIcon?.classList.remove('hidden')
} else {
  themeToggleDarkIcon?.classList.remove('hidden')
}

const themeToggleBtn = document.getElementById('theme-toggle')

themeToggleBtn?.addEventListener('click', function () {
  // toggle icons inside button
  themeToggleDarkIcon?.classList.toggle('hidden')
  themeToggleLightIcon?.classList.toggle('hidden')

  // if set via local storage previously
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('color-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('color-theme', 'light')
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('color-theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('color-theme', 'dark')
    }
  }
})

// Darkmode end

// Router Guards

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
  if (
    to.matched.some((record) => record.meta.requiresLoggedInUser) &&
    !userAuthStore.userStateIsLoggedIn
  ) {
    console.log('router guard: user is not logged in, redirecting to login')
    next({ name: 'login' })
    return
  }

  if (to.matched.some((record) => record.meta.hideForAuth) && userAuthStore.userStateIsLoggedIn) {
    console.log('router guard: user is logged in, redirecting to home')
    next({ name: 'home' })
    return
  }

  next()
  return
})
