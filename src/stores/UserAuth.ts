import { defineStore } from 'pinia'

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
        this.refreshToken = data.refresh
        this.isLoggedIn = true
        return true
      } else {
        this.authToken = ''
        this.refreshToken = ''
        this.isLoggedIn = false
        return false
      }
    },
    async logout() {
      this.isLoggedIn = false
    }
  }
})
