<template>
  <div class="text-blue-600">
    <h3 class="text-xl md:text-2xl lg:text-3xl">{{ task.title }}</h3>
    <p>delete</p>
  </div>
</template>

<script lang="ts">
export default {
  props: ['task']
}
</script>
