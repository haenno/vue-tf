<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import { useTaskStore } from './stores/TaskStore'
import { useUserAuthStore } from '@/stores/UserAuth'

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  MoonIcon,
  SunIcon
} from '@heroicons/vue/24/solid'
import {
  HomeIcon,
  InboxArrowDownIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon
} from '@heroicons/vue/24/outline'

const userAuthStore = useUserAuthStore()

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const flowbiteReferecnce = initFlowbite

  // check if user is logged in by checking the cookies
  userAuthStore.init()
})

const taskStore = useTaskStore()
</script>

<template>
  <header>
    <nav class="fixed top-0 left-0 z-50 w-14 h-14">
      <button
        aria-controls="nav-and-sidebar"
        class="m-1 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 sm:invisible bg-slate-100 text-gray-500 first-letter:hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 shadow"
        data-drawer-target="nav-and-sidebar"
        data-drawer-toggle="nav-and-sidebar"
        type="button"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" class="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </button>
    </nav>

    <aside
      id="nav-and-sidebar"
      aria-label="Sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen duration-500 transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <!-- new sidebar header -->

        <div class="flex justify-end items-center sm:w-64 absolute right-0 px-3 py-3">
          <div class="flex-auto me-3">
            <div class="flex ml-2">
              <img
                alt="haenno profile picture"
                class="h-11 mr-3 rounded-full"
                src="./assets/profilepic.jpg"
              />
              <span
                class="self-center italic text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-white"
                >haenno</span
              >
            </div>
          </div>

          <!-- Darkmode button start -->
          <div
            class="text-sm rounded-full focus:ring-4 me-2 bg-gray-200 dark:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <button
              id="theme-toggle"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-gray-200 dark:focus:ring-gray-700 focus:outline-none focus:ring-4 rounded-full text-sm p-2.5"
              type="button"
            >
              <div id="theme-toggle-dark-icon" class="hidden">
                <MoonIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <div id="theme-toggle-light-icon" class="hidden">
                <SunIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </button>
          </div>
          <!-- Darkmode button end -->
        </div>

        <!-- sidebar links -->
        <div class="absolute top-20 w-56">
          <ul class="space-y-2 font-medium">
            <li>
              <RouterLink
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                to="/"
              >
                <HomeIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span class="ml-3">Home</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                to="/about"
              >
                <InformationCircleIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />

                <span class="flex-1 ml-3 whitespace-nowrap">About</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                to="/login"
              >
                <ArrowRightOnRectangleIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />

                <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                to="/tasks"
              >
                <RectangleStackIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span class="flex-1 ml-3 whitespace-nowrap">Tasks</span>
                <span
                  v-if="userAuthStore.userState"
                  class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                  >{{ taskStore.totalCount }}</span
                >
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                to="/inbox"
              >
                <InboxArrowDownIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />

                <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                <span
                  class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >Pro</span
                >
              </RouterLink>
            </li>
            <li>
              <a
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                href="#"
                @click="userAuthStore.logout"
              >
                <ArrowLeftOnRectangleIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />

                <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
            <li>
              <a
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                href="#"
              >
                <PencilSquareIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />

                <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>

            <li>
              <a
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-hide="nav-and-sidebar"
                data-drawer-target="nav-and-sidebar"
                href="#"
              >
                <QuestionMarkCircleIcon
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span class="flex-1 ml-3 whitespace-nowrap"
                  >Logged in? {{ userAuthStore.userState }}</span
                >
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </header>

  <div class="mt-0 sm:mt-0 sm:ml-64">
    <div class="flex">
      <div class="m-auto">
        <div
          class="min-h-min min-w-fit max-w-fit p-5 m-4 shadow-md opacity-85 bg-gray-50 dark:bg-gray-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
