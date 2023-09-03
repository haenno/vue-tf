import { defineStore } from 'pinia'
import { useTaskStore } from '@/stores/TaskStore'

import Cookies from 'js-cookie'

const authCookie = Cookies.withAttributes({ sameSite: 'strict', secure: true })

/*
api/token/ [name='token_obtain_pair'] --> Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
api/token/verify/ [name='token_verify'] --> Takes a token and indicates if it is valid. This view provides no information about a token's fitness for a particular use.
api/token/refresh/ [name='token_refresh'] --> Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
api/token/blacklist/ [name='token_blacklist'] --> Takes a token and blacklists it. Must be used with the `rest_framework_simplejwt.token_blacklist` app installed.
*/

const authUrl = 'https://drf-jwt.tstsrv.de/api/token/'
const verifyTokenUrl = 'https://drf-jwt.tstsrv.de/api/token/verify/'
const refreshTokenUrl = 'https://drf-jwt.tstsrv.de/api/token/refresh/'
const blacklistTokenUrl = 'https://drf-jwt.tstsrv.de/api/token/blacklist/'

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
        this.logout()
      }
    },
    async logout() {
      this.isLoggedIn = false

      // blacklist refresh token
      let token_to_blacklist = null
      if (this.refreshToken) {
        token_to_blacklist = this.refreshToken
      }
      if (authCookie.get('refreshToken')) {
        token_to_blacklist = authCookie.get('refreshToken')!
      }
      if (token_to_blacklist != null) {
        await fetch(blacklistTokenUrl, {
          body: JSON.stringify({ refresh: token_to_blacklist }),
          headers: myHeaders,
          method: 'POST'
        })
      }

      this.authToken = ''
      authCookie.remove('authToken')

      this.refreshToken = ''
      authCookie.remove('refreshToken')
    },
    async init() {
      this.isLoggedIn = false

      if (authCookie.get('refreshToken') && authCookie.get('authToken')) {
        this.authToken = authCookie.get('authToken')!
        this.refreshToken = authCookie.get('refreshToken')!
        this.isLoggedIn = true
      }

      if (this.isLoggedIn === false) {
        this.logout()
      }
    },
    async validateTokens() {
      if (this.isLoggedIn) {
        // check if refresh token is valid
        const response_refreshTokenVerify = await fetch(verifyTokenUrl, {
          body: JSON.stringify({ token: this.refreshToken }),
          headers: myHeaders,
          method: 'POST'
        })

        if (!response_refreshTokenVerify.ok) {
          console.log('validateTokens: refreshToken is NOT valid')
          this.logout()
          return
        }

        // check if access token is valid
        const response_authTokenVerify = await fetch(verifyTokenUrl, {
          body: JSON.stringify({ token: this.authToken }),
          headers: myHeaders,
          method: 'POST'
        })

        if (!response_authTokenVerify.ok) {
          // if access token is expired, refresh it by using the refresh token
          const response_refreshToken = await fetch(refreshTokenUrl, {
            body: JSON.stringify({ refresh: this.refreshToken }),
            headers: myHeaders,
            method: 'POST'
          })

          if (response_refreshToken.ok) {
            const data = await response_refreshToken.json()
            this.authToken = data.access
            authCookie.set('authToken', this.authToken)
            this.refreshToken = data.refresh
            authCookie.set('refreshToken', this.refreshToken)
          } else {
            console.log('validateTokens: access token refresh did NOT work!')
            this.logout()
            return
          }
        }
      }
    }
  }
})
