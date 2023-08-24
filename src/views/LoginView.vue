<template>
  <div class="p-6 space-y-4">
    <h1
      class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
    >
      Sign in to your account
    </h1>
    <form @submit.prevent="sendLogin" class="space-y-4 md:space-y-6">
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your username</label
        >
        <input
          type="username"
          name="username"
          id="username"
          v-model="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Password</label
        >
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <ButtonDefaultStyle class="w-full" type="submit" :button="{ text: 'Login' }" />
      </div>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        <a
          href="#"
          class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >Forgot password?</a
        >
      </p>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >Sign up!</a
        >
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonDefaultStyle from '@/components/ButtonDefaultStyle.vue'

import { useUserAuthStore } from '@/stores/UserAuth'

export default defineComponent({
  components: {
    ButtonDefaultStyle
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  setup() {
    const userAuthStore = useUserAuthStore()
    return { userAuthStore }
  },
  methods: {
    sendLogin() {
      this.userAuthStore.login(this.username, this.password)
    }
  }
})
</script>

<style scoped></style>
