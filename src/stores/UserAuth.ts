import { defineStore } from 'pinia'
import { useTaskStore } from '@/stores/TaskStore'

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
        sessionStorage.setItem('authToken', this.authToken)
        this.refreshToken = data.refresh
        sessionStorage.setItem('refreshToken', this.refreshToken)
        this.isLoggedIn = true
      } else {
        this.authToken = ''
        sessionStorage.removeItem('authToken')
        this.refreshToken = ''
        sessionStorage.removeItem('refreshToken')
        this.isLoggedIn = false
      }
    },
    async logout() {
      this.isLoggedIn = false
    },
    async init() {
      if (sessionStorage.getItem('refreshToken') && sessionStorage.getItem('authToken')) {
        this.authToken = sessionStorage.getItem('authToken')!
        this.refreshToken = sessionStorage.getItem('refreshToken')!
        this.isLoggedIn = true
      } else {
        this.authToken = ''
        sessionStorage.removeItem('authToken')
        this.refreshToken = ''
        sessionStorage.removeItem('refreshToken')
        this.isLoggedIn = false
      }
    }
  }
})
