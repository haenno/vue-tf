<template>
  <li>
    <RouterLink
      class="flex items-center p-2 text-stone-900 rounded-lg dark:text-white hover:bg-stone-300 dark:hover:bg-stone-700 group"
      active-class="dark:bg-stone-600 bg-stone-200"
      data-drawer-hide="nav-and-sidebar"
      data-drawer-target="nav-and-sidebar"
      :to="navLink.target"
    >
      <slot></slot>
      <span class="flex-1 ml-3 whitespace-nowrap">{{ navLink.text }}</span>
      <slot name="hint"></slot>
    </RouterLink>
  </li>
</template>

<script lang="ts">
export default {
  props: ['navLink']
}
</script>
