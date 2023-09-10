import { defineStore } from 'pinia'

const get_latest_news = 'https://drfjwt.haenno.de/news_api/latest_news/'
const get_news_after_id = 'https://drfjwt.haenno.de/news_api/news_after_id/'
const create_fake_news = 'https://drfjwt.haenno.de/news_api/fake_news/'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json; charset=UTF-8')
myHeaders.append('Accept', 'application/json')

export const useNewsStore = defineStore('newsstore', {
  state: () => ({
    last_id: 0,
    news_array: [] as { id: number; text: string }[]
  }),
  getters: {
    getLastId(): Number {
      return this.last_id
    },
    getNewsArray(): { id: number; text: string }[] {
      return this.news_array.sort((a, b) => b.id - a.id)
    }
  },

  actions: {
    async get_latest_news() {
      const response = await fetch(get_latest_news, {
        headers: myHeaders,
        method: 'GET'
      })

      console.log(response)
      if (response.ok) {
        const data = await response.json()
        console.log(data)

        for (let i = 0; i < data.length; i++) {
          if (data[i].id > this.last_id) {
            this.last_id = data[i].id
          }
          // pass if duplicate
          if (this.news_array.find((element) => element.id === data[i].id)) {
            console.log('passing duplicate')
            continue
          } else {
            console.log('adding new news')
            this.news_array.push({ id: data[i].id, text: data[i].news_text })
          }
        }
      } else {
        console.log('get_latest_news: did NOT work!')
        const content = await response.json()
        return { status: response.status, message: content.detail }
      }
    },
    async get_news_after_id() {
      console.log('get_news_after_id')

      if (this.last_id === 0) {
        this.get_latest_news()
      }

      const full_url = get_news_after_id + this.last_id + '/'
      const response = await fetch(full_url, {
        headers: myHeaders,
        method: 'GET'
      })

      console.log(response)
      if (response.ok) {
        const data = await response.json()
        console.log(data)

        for (let i = 0; i < data.length; i++) {
          if (data[i].id > this.last_id) {
            this.last_id = data[i].id
          }
          // pass if duplicate
          if (this.news_array.find((element) => element.id === data[i].id)) {
            console.log('passing duplicate')
            continue
          } else {
            console.log('adding new news')
            this.news_array.push({ id: data[i].id, text: data[i].news_text })
          }
        }
      } else {
        console.log('get_latest_news: did NOT work!')
        const content = await response.json()
        return { status: response.status, message: content.detail }
      }
    },
    async create_fake_news() {
      const response = await fetch(create_fake_news, {
        headers: myHeaders,
        method: 'GET'
      })

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        console.log('fake news created!')
      } else {
        console.log('fake news NOT created!')
      }
    }
  }
})
