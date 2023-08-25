<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { BeakerIcon } from '@heroicons/vue/24/solid'
import { Battery0Icon } from '@heroicons/vue/24/solid'
import { Battery50Icon } from '@heroicons/vue/24/outline'
import { Battery100Icon } from '@heroicons/vue/24/solid'

const counter = useCounterStore()

console.log(counter.count)
counter.increment()
console.log(counter.count)
counter.count++
console.log(counter.count)
</script>

<template>
  <h1>This is an about page</h1>
  <div id="icon_test">
    <BeakerIcon class="h-16 w-16 text-blue-500" />
    <Battery0Icon class="h-12 w-12 text-red-500" />
    <Battery50Icon class="h-8 w-8 text-yellow-300" />
    <Battery100Icon class="h-24 w-24 text-green-500" />
  </div>
</template>
