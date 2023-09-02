<template>
  <main>
    <h1 class="text-2xl md:text-3xl lg:text-4xl">{{ taskStore.name }}</h1>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <tabs v-model="activeTab" class="p-5">
      <!-- class appends to content DIV for all tabs -->
      <tab name="all" title="All tasks" @click="filter = 'all'">
        <spinner v-if="taskStore.isLoading" class="m-5" color="yellow" size="10" />

        <div v-if="filter === 'all'">
          <!-- return here: https://www.youtube.com/watch?v=ixxSKJi4QXI&list=PL4cUxeGkcC9hp28dYyYBy3xoOdoeNw-hD&index=8 for async actions -->

          <p>All tasks: (You have {{ taskStore.totalCount }} Tasks)</p>

          <div v-for="task in taskStore.tasks" :key="task.id">
            <TaskDetails :task="task" />
          </div>
        </div>
      </tab>
      <tab name="favs" title="Favorites" @click="filter = 'favs'">
        <spinner v-if="taskStore.isLoading" class="m-5" color="yellow" size="10" />
        <div v-if="filter === 'favs'">
          <p>Favorite tasks: (You have {{ taskStore.favCount }} Favorites )</p>
          <div v-for="task in taskStore.favs" :key="task.id">
            <TaskDetails :task="task" />
          </div>
        </div>
      </tab>
    </tabs>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'
import TaskDetails from '@/components/TaskDetails.vue'
import TaskForm from '@/components/TaskForm.vue'
import { Spinner, Tab, Tabs } from 'flowbite-vue'

export default defineComponent({
  components: {
    TaskDetails,
    TaskForm,
    Tabs,
    Tab,
    Spinner
  },
  setup() {
    const activeTab = ref('all')
    const taskStore = useTaskStore()

    // fetch tasks
    taskStore.getTasks()

    // const filter = ref('all')
    const filter = activeTab

    return { taskStore, filter, activeTab }
  }
})
</script>

<style scoped></style>
