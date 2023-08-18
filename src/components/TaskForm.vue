<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />

    <ButtonDefaultStyle type :button="{ text: 'Add' }" />
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import ButtonDefaultStyle from './ButtonDefaultStyle.vue'
import { useTaskStore } from '@/stores/TaskStore'

export default {
  setup() {
    const taskStore = useTaskStore()
    const newTask = ref('')

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: Math.floor(Math.random() * 1000000)
        })
        newTask.value = ''
      }
    }
    return { newTask, handleSubmit }
  },

  components: {
    ButtonDefaultStyle
  }
}
</script>
