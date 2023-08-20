<template>
  <div>inbox view</div>
  <Pagination v-model="currentPage" :total-pages="100" :slice-length="4"></Pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Pagination } from 'flowbite-vue'
import { ref } from 'vue'


export default defineComponent({
  setup() {
    const currentPage = ref(1)
    return  { currentPage, Pagination }
  }
})
</script>
