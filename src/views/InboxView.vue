<template>
  <div>inbox view</div>
  <spinner class="m-5" color="yellow" size="10" />
  <Pagination class="w-80" v-model="currentPage" :total-pages="100" :slice-length="4"></Pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Pagination } from 'flowbite-vue'
import { ref } from 'vue'
import { Spinner } from 'flowbite-vue'

export default defineComponent({
  components: {
    Pagination,
    Spinner
  },
  setup() {
    const currentPage = ref(19)
    return { currentPage }
  }
})
</script>
