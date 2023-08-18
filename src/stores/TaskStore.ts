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
    },
    favCount(): number {
      return this.tasks.reduce((p: number, c: { id: number; title: string; isFav: boolean }) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    addTask(task: { id: number; title: string; isFav: boolean }) {
      this.tasks.push(task)
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((t: { id: number; title: string; isFav: boolean }) => {
        return t.id !== id
      })
    },
    toggleFav(id: number) {
      const task = this.tasks.find(
        (t: { id: number; title: string; isFav: boolean }) => t.id === id
      )
      if (task) {
        task.isFav = !task.isFav
      }
    }
  }
})
