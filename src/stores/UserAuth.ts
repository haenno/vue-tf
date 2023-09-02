import { defineStore } from 'pinia'
import { useTaskStore } from '@/stores/TaskStore'

import Cookies from 'js-cookie'

const authCookie = Cookies.withAttributes({ sameSite: 'strict', secure: true })

const authUrl = 'https://drf-jwt.tstsrv.de/api/token/'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json; charset=UTF-8')
myHeaders.append('Accept', 'application/json')

export const useUserAuthStore = defineStore('userauthstore', {
  state: () => ({
    loginCredentials: [] as { username: string; password: string }[],
    isLoggedIn: false,
    authToken: '',
    refreshToken: ''
  }),
  getters: {
    userState(): boolean {
      if (this.isLoggedIn) {
        const taskstore = useTaskStore()
        taskstore.getTasks()
      }
      return this.isLoggedIn
    }
  },
  actions: {
    async login(username: string, password: string) {
      const response = await fetch(authUrl, {
        body: JSON.stringify({ username: username, password: password }),
        headers: myHeaders,
        method: 'POST'
      })

      console.log(response)
      if (response.ok) {
        const data = await response.json()

        this.authToken = data.access
        authCookie.set('authToken', this.authToken)
        sessionStorage.setItem('authToken', this.authToken)

        this.refreshToken = data.refresh
        authCookie.set('refreshToken', this.refreshToken)
        sessionStorage.setItem('refreshToken', this.refreshToken)

        this.isLoggedIn = true
      } else {
        this.authToken = ''
        authCookie.remove('authToken')
        sessionStorage.removeItem('authToken')

        this.refreshToken = ''
        authCookie.remove('refreshToken')
        sessionStorage.removeItem('refreshToken')

        this.isLoggedIn = false
      }
    },
    async logout() {
      this.authToken = ''
      sessionStorage.removeItem('authToken')
      authCookie.remove('authToken')

      this.refreshToken = ''
      sessionStorage.removeItem('refreshToken')
      authCookie.remove('refreshToken')

      this.isLoggedIn = false
    },
    async init() {
      this.isLoggedIn = false

      if (sessionStorage.getItem('refreshToken') && sessionStorage.getItem('authToken')) {
        this.authToken = sessionStorage.getItem('authToken')!
        authCookie.set('authToken', this.authToken)

        this.refreshToken = sessionStorage.getItem('refreshToken')!
        authCookie.set('refreshToken', this.refreshToken)

        this.isLoggedIn = true
      }

      if (authCookie.get('refreshToken') && authCookie.get('authToken')) {
        this.authToken = authCookie.get('authToken')!
        sessionStorage.setItem('authToken', this.authToken)

        this.refreshToken = authCookie.get('refreshToken')!
        sessionStorage.setItem('refreshToken', this.refreshToken)

        this.isLoggedIn = true
      }

      if (this.isLoggedIn === false) {
        this.authToken = ''
        sessionStorage.removeItem('authToken')
        authCookie.remove('authToken')

        this.refreshToken = ''
        sessionStorage.removeItem('refreshToken')
        authCookie.remove('refreshToken')
      }
    }
  }
})
