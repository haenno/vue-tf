<template>
  <button
    class="bg-gray-200 hover:bg-gray-300 focus:ring-blue-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
    type="button">
    {{ button.text }}
  </button>
</template>

<script lang="ts">
export default {
  props: ['button']
}
</script>
