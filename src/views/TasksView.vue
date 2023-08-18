<template>
  <main>
    <h1 class="text-2xl md:text-3xl lg:text-4xl">{{ taskStore.name }}</h1>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <div class="bg-yellow-300 p-1 m-1">
      <ButtonDefaultStyle @click="filter = 'all'" :button="{ text: 'All tasks' }" />
      <ButtonDefaultStyle @click="filter = 'favs'" :button="{ text: 'Favorites' }" />
    </div>

    <div v-if="filter === 'all'">
      <!-- return here: https://www.youtube.com/watch?v=ixxSKJi4QXI&list=PL4cUxeGkcC9hp28dYyYBy3xoOdoeNw-hD&index=8 for async actions -->

      <p>All tasks: (You have {{ taskStore.totalCount }} Tasks)</p>

      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div v-if="filter === 'favs'">
      <p>Favorite tasks: (You have {{ taskStore.favCount }} Favorites )</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'
import TaskDetails from '@/components/TaskDetails.vue'
import ButtonDefaultStyle from '@/components/ButtonDefaultStyle.vue'
import TaskForm from '@/components/TaskForm.vue'

export default defineComponent({
  components: {
    TaskDetails,
    ButtonDefaultStyle,
    TaskForm
  },
  setup() {
    const taskStore = useTaskStore()

    const filter = ref('all')

    return { taskStore, filter }
  }
})
</script>

<style scoped></style>
