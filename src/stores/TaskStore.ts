import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskstore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'Task 1', isFav: false },
      { id: 2, title: 'Task 2', isFav: true }
    ],
    name: 'Fancy Task Store'
  }),
  getters: {
    favs(): { id: number; title: string; isFav: boolean }[] {
      return this.tasks.filter((t: { id: number; title: string; isFav: boolean }) => t.isFav)
    }
  }
})
