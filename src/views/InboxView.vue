<template>
  <div>inbox view</div>
  <spinner class="m-5" color="yellow" size="10" />
  <Pagination :class="['w-fit']" v-model="currentPage" :total-pages="30"> </Pagination>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Pagination, Spinner } from 'flowbite-vue'

export default defineComponent({
  components: {
    Pagination,
    Spinner
  },
  setup() {
    const currentPage = ref(1)
    return { currentPage }
  }
})
</script>
