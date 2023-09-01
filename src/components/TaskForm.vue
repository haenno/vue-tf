<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" placeholder="I need to..." type="text"/>

    <ButtonDefaultStyle :button="{ text: 'Add' }" type/>
  </form>
</template>

<script lang="ts">
import {ref} from 'vue'
import ButtonDefaultStyle from './ButtonDefaultStyle.vue'
import {useTaskStore} from '@/stores/TaskStore'

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
    return {newTask, handleSubmit}
  },

  components: {
    ButtonDefaultStyle
  }
}
</script>
