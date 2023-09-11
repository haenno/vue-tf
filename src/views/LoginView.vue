<template>
  <div class="p-6 space-y-4">
    <h1
      class="text-xl font-bold leading-tight tracking-tight text-stone-900 md:text-2xl dark:text-white"
    >
      Sign in to your account
    </h1>
    <form class="space-y-4 md:space-y-6" @submit.prevent="sendLogin">
      <div>
        <label class="block mb-2 text-sm font-medium text-stone-900 dark:text-white" for="username"
          >Your username</label
        >
        <input
          id="username"
          v-model="username"
          class="bg-stone-50 border border-stone-300 text-stone-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="username"
          placeholder="Username"
          required
          type="username"
        />
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-stone-900 dark:text-white" for="password"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          class="bg-stone-50 border border-stone-300 text-stone-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="password"
          placeholder="••••••••"
          type="password"
        />
      </div>
      <div if="error_message">
        <p class="text-sm font-medium text-red-500 dark:text-red-400">{{ error_message }}</p>
      </div>
      <div>
        <ButtonDefaultStyle :button="{ text: 'Login' }" class="w-full" type="submit" />
      </div>
      <p class="text-sm font-light text-stone-500 dark:text-stone-400">
        <a
          class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          href="#"
          >Forgot password?</a
        >
      </p>
      <p class="text-sm font-light text-stone-500 dark:text-stone-400">
        Don’t have an account yet?
        <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#"
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
      error_message: '',
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
      let login_result = this.userAuthStore.login(this.username, this.password)

      login_result.then((result) => {
        if (result?.status === 200) {
          this.$router.push({ name: 'tasks' })
        } else {
          this.error_message = result?.message
        }
      })
    }
  }
})
</script>

<style scoped></style>
