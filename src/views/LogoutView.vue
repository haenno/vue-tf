
<template>
  <h1>Logout</h1>
  <ButtonDefaultStyle :button="{ text: 'Logout' }" @click="logoutClick" />
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import ButtonDefaultStyle from '@/components/ButtonDefaultStyle.vue'
import { useUserAuthStore } from '@/stores/UserAuth'

export default defineComponent({
  components: {
    ButtonDefaultStyle
  },
  methods: {
    logoutClick() {
      this.userAuthStore.logout()
      this.$router.push({ name: 'login' })
    }
  },
  setup() {
    const userAuthStore = useUserAuthStore()
    return { userAuthStore }
  },
})

</script>
