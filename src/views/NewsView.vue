<template>
  <h1>This is an news page</h1>

  <div class="place-content-center inline-flex w-full">
    <ButtonDefaultStyle
      :button="{ text: 'Get news' }"
      class="w-48"
      @click="newsStore.get_latest_news()"
    />
    <ButtonDefaultStyle
      :button="{ text: 'Create more news' }"
      class="w-48"
      @click="newsStore.create_fake_news()"
    />
  </div>
  <div
    id="news_box"
    class="m-5 scroll-p-2 overflow-auto h-40 flex flex-col-reverse px-4 py-2 bg-gray-200 rounded-t-lg dark:bg-gray-700"
  >
    <!--<div id="news_box" class="scroll-p-2 overflow-auto h-60">-->
    <div v-for="id in newsStore.getNewsArray" :key="id.id" :class="`news-index-${id.id}`">
      {{ id.id }}: {{ id.text }}
    </div>
  </div>

  <div id="table">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-600 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Folder</th>
            <th scope="col" class="px-6 py-3">Function</th>
            <th scope="col" class="px-6 py-3">E-Mails</th>

            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">2</td>

            <td class="px-6 py-4">
              <ArrowPathIcon
                class="w-5 h-5 hover:cursor-pointer hover:animate-spin"
                @click="action_button('foo bar wiz')"
              />
            </td>
          </tr>
          <tr
            class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
              Microsoft Surface Pro
            </th>
            <td class="px-6 py-4">White</td>
            <td class="px-6 py-4">21</td>

            <td class="px-6 py-4">
              <ArrowPathIcon
                class="w-5 h-5 hover:cursor-pointer hover:animate-spin"
                @click="action_button('12qq1q1q1q')"
              />
            </td>
          </tr>
          <tr
            class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">Magic Mouse 2</th>
            <td class="px-6 py-4">Black</td>
            <td class="px-6 py-4">23</td>

            <td class="px-6 py-4">
              <ArrowPathIcon
                class="w-5 h-5 hover:cursor-pointer hover:animate-spin"
                @click="action_button('2124')"
              />
            </td>
          </tr>
          <tr
            class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">Apple Watch</th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">44</td>

            <td class="px-6 py-4">
              <ArrowPathIcon
                class="w-5 h-5 hover:cursor-pointer hover:animate-spin"
                @click="action_button('yxcv')"
              />
            </td>
          </tr>
          <tr
            class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">iPad</th>
            <td class="px-6 py-4">Gold</td>
            <td class="px-6 py-4">19</td>

            <td class="px-6 py-4">
              <ArrowPathIcon
                class="w-5 h-5 hover:cursor-pointer hover:animate-spin"
                @click="action_button('asdf')"
              />
            </td>
          </tr>
          <tr
            class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">Apple iMac 27"</th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">34</td>

            <td class="px-6 py-4">
              <ArrowPathIcon
                class="w-5 h-5 hover:cursor-pointer hover:animate-spin"
                @click="action_button('qwer')"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div id="toast-area">
    <Toast :type="'warning'" closable divide> Improve password difficulty. </Toast>

    <Toast :type="'success'" alignment="end" closable divide> Item moved successfully. </Toast>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated } from 'vue'
import ButtonDefaultStyle from '@/components/ButtonDefaultStyle.vue'

import { useNewsStore } from '@/stores/NewsStore'

import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { Toast } from 'flowbite-vue'
const newsStore = useNewsStore()

let news_cursor = 0

onUpdated(() => {
  // text content should be the same as current `count.value`
  console.log('news updated')
  if (news_cursor == newsStore.last_id) {
    return
  } else {
    news_cursor = newsStore.last_id
    scrollToElement(`news-index-${newsStore.last_id}`)
  }
})

setInterval(() => {
  newsStore.get_news_after_id()
}, 2000) // 2 seconds

onMounted(() => {
  newsStore.get_latest_news()
  scrollToElement(`news-index-${newsStore.last_id}`)
})

function scrollToElement(element_name: string) {
  const el = document.getElementsByClassName(element_name)[0]

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else {
    console.log('element not found')
  }
}

function action_button(api_url: string) {
  console.log('action button: ' + api_url)
  // add api get call here
}
</script>
