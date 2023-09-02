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

        this.refreshToken = data.refresh
        authCookie.set('refreshToken', this.refreshToken)

        this.isLoggedIn = true
      } else {
        this.authToken = ''
        authCookie.remove('authToken')

        this.refreshToken = ''
        authCookie.remove('refreshToken')

        this.isLoggedIn = false
      }
    },
    async logout() {
      this.authToken = ''
      authCookie.remove('authToken')

      this.refreshToken = ''
      authCookie.remove('refreshToken')

      this.isLoggedIn = false
    },
    async init() {
      this.isLoggedIn = false

      if (authCookie.get('refreshToken') && authCookie.get('authToken')) {
        this.authToken = authCookie.get('authToken')!
        this.refreshToken = authCookie.get('refreshToken')!
        this.isLoggedIn = true
      }

      if (this.isLoggedIn === false) {
        this.authToken = ''
        authCookie.remove('authToken')

        this.refreshToken = ''
        authCookie.remove('refreshToken')
      }
    }
  }
})
