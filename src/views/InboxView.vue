<template>
  <div>inbox view</div>
  <spinner class="m-5" color="yellow" size="10"/>
  <Pagination v-model="currentPage" :slice-length="4" :total-pages="100" class="w-80"></Pagination>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

import {Pagination, Spinner} from 'flowbite-vue'

export default defineComponent({
  components: {
    Pagination,
    Spinner
  },
  setup() {
    const currentPage = ref(19)
    return {currentPage}
  }
})
</script>
