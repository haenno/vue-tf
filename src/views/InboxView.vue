<template>
  <div>inbox view</div>
  <FwbSpinner class="m-5" color="yellow" size="10" />
  <FwbPagination :class="['w-fit']" v-model="currentPage" :total-pages="30"> </FwbPagination>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { FwbPagination, FwbSpinner } from 'flowbite-vue'

export default defineComponent({
  components: {
    FwbPagination,
    FwbSpinner
  },
  setup() {
    const currentPage = ref(1)
    return { currentPage }
  }
})
</script>
