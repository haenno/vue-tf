import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskstore', {
  state: () => ({
    tasks: [],
    isLoading: false,
    //tasks: [
//      { id: 1, title: 'Task 1', isFav: false },
      //{ id: 2, title: 'Task 2', isFav: true }
    //],
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
    async getTasks() {
      this.isLoading = true
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNjUzNjQwLCJpYXQiOjE2OTI2NTMzNDAsImp0aSI6ImM5MDU2NGM3Mzc2OTQ3Zjc5ZWI5YTE5MDUyODViMWE3IiwidXNlcl9pZCI6MX0.Uz8t_1W1s-42dSZ7P57ryW90Pig3UUAk7KYgIV8IY2E');
      myHeaders.append('Content-Type', 'application/json');


      
      const res = await fetch("https://drf-jwt.tstsrv.de/tasks_test_api/task/", { headers: myHeaders })
      const data = await res.json()
      this.tasks = data
      this.isLoading = false
    },


      async addTask(task: { id: number; title: string; isFav: boolean }) {
        
        this.isLoading = true
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNjUzNjQwLCJpYXQiOjE2OTI2NTMzNDAsImp0aSI6ImM5MDU2NGM3Mzc2OTQ3Zjc5ZWI5YTE5MDUyODViMWE3IiwidXNlcl9pZCI6MX0.Uz8t_1W1s-42dSZ7P57ryW90Pig3UUAk7KYgIV8IY2E');
        
        this.tasks.push(task)
      const res = await fetch("https://drf-jwt.tstsrv.de/tasks_test_api/task/", {
         method:"POST",
         body: JSON.stringify(task), 
         headers: myHeaders 
        })

        if(res.error) {
          console.log(res.error)
         }
         this.isLoading = false         
      },

    async deleteTask(id: number) {
      this.isLoading = true
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNjUzNjQwLCJpYXQiOjE2OTI2NTMzNDAsImp0aSI6ImM5MDU2NGM3Mzc2OTQ3Zjc5ZWI5YTE5MDUyODViMWE3IiwidXNlcl9pZCI6MX0.Uz8t_1W1s-42dSZ7P57ryW90Pig3UUAk7KYgIV8IY2E');


      this.tasks = this.tasks.filter((t: { id: number; title: string; isFav: boolean }) => {
        return t.id !== id
      })

      const res = await fetch("https://drf-jwt.tstsrv.de/tasks_test_api/task/" + id, {
         method:"DELETE",
         headers: myHeaders          
        })

        if(res.error) {
          console.log(res.error)
         }      
         this.isLoading = false
    },
    async toggleFav(id: number) {
      this.isLoading = true
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNjUzNjQwLCJpYXQiOjE2OTI2NTMzNDAsImp0aSI6ImM5MDU2NGM3Mzc2OTQ3Zjc5ZWI5YTE5MDUyODViMWE3IiwidXNlcl9pZCI6MX0.Uz8t_1W1s-42dSZ7P57ryW90Pig3UUAk7KYgIV8IY2E');


      const task = this.tasks.find(
        (t: { id: number; title: string; isFav: boolean }) => t.id === id
      )
      if (task) {
        task.isFav = !task.isFav
      }

      const res = await fetch("https://drf-jwt.tstsrv.de/tasks_test_api/task/" + id, {
        method:"PATCH",
        body: JSON.stringify( {isFav: task.isFav } ), 
        headers: myHeaders 
       })

       if(res.error) {
         console.log(res.error)
        }
        this.isLoading = false
    }
  }
})
