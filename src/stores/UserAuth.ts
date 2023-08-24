import { defineStore } from 'pinia'

interface LoginCredential {
  username: string
  password: string
}

const authUrl = 'https://drf-jwt.tstsrv.de/tasks_test_api/auth/'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json; charset=UTF-8')
myHeaders.append('Accept', 'application/json')

export const useUserAuthStore = defineStore('userauthstore', {
  state: () => ({
    loginCredentials: [] as LoginCredential[],
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
      this.isLoggedIn = true
    },
    async logout() {
      this.isLoggedIn = false
    }
  }
})
