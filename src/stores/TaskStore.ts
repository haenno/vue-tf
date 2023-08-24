import { defineStore } from 'pinia'

interface Task {
  id: number
  title: string
  isFav: boolean
}

export const useTaskStore = defineStore('taskstore', {
  state: () => ({
    tasks: [] as Task[],
    isLoading: false,
    //tasks: [
    //   { id: 1, title: 'Task 1', isFav: false },
    //{ id: 2, title: 'Task 2', isFav: true }
    //],
    name: 'Fancy Task Store'
  }),
  getters: {
    favs(): Task[] {
      return this.tasks.filter((t: Task) => t.isFav)
    },
    favCount(): number {
      return this.tasks.reduce((p: number, c: Task) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    async getTasks() {
      this.isLoading = true
      const myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyODI0ODYyLCJpYXQiOjE2OTI4MjQ1NjIsImp0aSI6ImRhYjQ1ZDllMWNiODRlMDdhMGNmYjg1YWZkODlhYjNlIiwidXNlcl9pZCI6MX0.rIYrkwdsY6fuz1AWDfqIvPdN-n1H0GmL5QJ4Nk2R3fg'
      )
      myHeaders.append('Content-Type', 'application/json; charset=UTF-8')
      myHeaders.append('Accept', 'application/json')

      const res = await fetch('https://drf-jwt.tstsrv.de/tasks_test_api/task/', {
        headers: myHeaders
      })
      const data = await res.json()
      this.tasks = data
      this.isLoading = false
    },

    async addTask(task: { id: number; title: string; isFav: boolean }) {
      this.isLoading = true
      const myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyODI0ODYyLCJpYXQiOjE2OTI4MjQ1NjIsImp0aSI6ImRhYjQ1ZDllMWNiODRlMDdhMGNmYjg1YWZkODlhYjNlIiwidXNlcl9pZCI6MX0.rIYrkwdsY6fuz1AWDfqIvPdN-n1H0GmL5QJ4Nk2R3fg'
      )
      myHeaders.append('Content-Type', 'application/json')

      this.tasks.push(task)
      const res = await fetch('https://drf-jwt.tstsrv.de/tasks_test_api/task/', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: myHeaders
      })

      if (!res.ok) {
        console.log(res.statusText)
      }
      this.isLoading = false
    },

    async deleteTask(id: number) {
      this.isLoading = true
      const myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyODI0ODYyLCJpYXQiOjE2OTI4MjQ1NjIsImp0aSI6ImRhYjQ1ZDllMWNiODRlMDdhMGNmYjg1YWZkODlhYjNlIiwidXNlcl9pZCI6MX0.rIYrkwdsY6fuz1AWDfqIvPdN-n1H0GmL5QJ4Nk2R3fg'
      )
      myHeaders.append('Content-Type', 'application/json')

      this.tasks = this.tasks.filter((t: Task) => {
        return t.id !== id
      })

      const res = await fetch('https://drf-jwt.tstsrv.de/tasks_test_api/task/' + id, {
        method: 'DELETE',
        headers: myHeaders
      })

      if (!res.ok) {
        console.log(res.statusText)
      }
      this.isLoading = false
    },
    async toggleFav(id: number) {
      this.isLoading = true
      const myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyODI0ODYyLCJpYXQiOjE2OTI4MjQ1NjIsImp0aSI6ImRhYjQ1ZDllMWNiODRlMDdhMGNmYjg1YWZkODlhYjNlIiwidXNlcl9pZCI6MX0.rIYrkwdsY6fuz1AWDfqIvPdN-n1H0GmL5QJ4Nk2R3fg'
      )
      myHeaders.append('Content-Type', 'application/json')
      //myHeaders.append('Content-Type', 'application/json; charset=UTF-8');
      //myHeaders.append('Accept', 'application/json');

      const task = this.tasks.find((t: Task) => t.id === id)

      if (task === undefined) {
        this.isLoading = false
        return
      }

      if (task) {
        task.isFav = !task.isFav
      }

      const res = await fetch('https://drf-jwt.tstsrv.de/tasks_test_api/task/' + id + '/', {
        method: 'PATCH',
        body: JSON.stringify({
          isFav: task.isFav
        }),
        headers: myHeaders
      })

      if (!res.ok) {
        console.log(res.statusText)
      }
      this.isLoading = false
    }
  }
})
