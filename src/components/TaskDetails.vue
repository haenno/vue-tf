<template>
  <div class="font-bold text-xl md:text-2xl lg:text-3xl">
    {{ task.title }}
    <a href="#" @click="taskStore.deleteTask(task.id)">🗑️</a>

    <a v-if="task.isFav" href="#" @click="taskStore.toggleFav(task.id)">❤️</a>
    <a v-if="!task.isFav" href="#" @click="taskStore.toggleFav(task.id)">🖤</a>
  </div>
</template>

<script lang="ts">
import { useTaskStore } from '@/stores/TaskStore'

export default {
  props: ['task'],
  setup() {
    const taskStore = useTaskStore()

    return { taskStore }
  }
}
</script>
