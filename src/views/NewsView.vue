<template>
  <h1>This is an news page</h1>
  <ButtonDefaultStyle
    :button="{ text: 'Get news' }"
    class="w-full"
    @click="newsStore.get_latest_news()"
  />
  <ButtonDefaultStyle
    :button="{ text: 'Create more news' }"
    class="w-full"
    @click="newsStore.create_fake_news()"
  />

  <div
    id="news_box"
    class="m-5 scroll-p-2 overflow-auto h-40 flex flex-col-reverse px-4 py-2 bg-gray-200 rounded-t-lg dark:bg-gray-700"
  >
    <!--<div id="news_box" class="scroll-p-2 overflow-auto h-60">-->
    <div v-for="id in newsStore.getNewsArray" :key="id.id" :class="`news-index-${id.id}`">
      {{ id.id }}: {{ id.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated } from 'vue'
import ButtonDefaultStyle from '@/components/ButtonDefaultStyle.vue'

import { useNewsStore } from '@/stores/NewsStore'

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
</script>
