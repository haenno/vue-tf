<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

console.log(counter.count)
counter.increment()
console.log(counter.count)
counter.count++
console.log(counter.count)
</script>

<template>
  <h1>This is an about page</h1>
</template>
