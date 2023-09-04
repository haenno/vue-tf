<template>
  <li>
    <RouterLink
      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group"
      active-class="dark:bg-gray-700 bg-gray-200"
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
