# haenno vue-tf

Template for a frontend with Vite / Vue 3, Tailwind CSS and Flowbite. Also, a simple implementation of pinia as a store, access to an API (tasks: add, delete, change), and login to an API with saving the JWT token to a secure cookie.

## Live demo

Check out the live demo at [haenno.de](https://haenno.de) and [haenno.github.io/vue-tf/](https://haenno.github.io/vue-tf/).

[![Demo deployment](https://github.com/haenno/vue-tf/actions/workflows/gh-pages-deploy.yml/badge.svg?branch=main)](https://github.com/haenno/vue-tf/actions/workflows/gh-pages-deploy.yml)

## Honorable mentions, useful resources

- Install Vite / Vue 3: <https://vitejs.dev/guide/>
- Install Flowbite: <https://github.com/themesberg/flowbite-vue>
- Modal component for testing: <https://github.com/themesberg/flowbite>
- Template sidebar: <https://flowbite.com/docs/components/sidebar/#sidebar-with-navbar>
- Fix not working hamburger menu: <https://github.com/themesberg/flowbite/issues/460#issuecomment-1528902938>
- Fix 'not defined' error in ESLint: <https://stackoverflow.com/a/76664653>
- Dark Mode: <https://flowbite.com/docs/customize/dark-mode/> and <https://tailwindcss.com/docs/dark-mode>
- Pinia (Vue 3 store) counter example: <https://pinia.vuejs.org/introduction.html>
- Pinia example: <https://www.youtube.com/playlist?list=PL4cUxeGkcC9hp28dYyYBy3xoOdoeNw-hD>

## Tailwind CSS / Flowbite colors for bright and dark mode

| Element | Bright | Dark |
| --- | --- | --- |
| Background | `x` | `x` |
| Nav-Background | `x` | `x` |
| Nav-Text | `x` | `x` |
| Button-Background | `bg-gray-200` | `dark:bg-gray-600` |
| Button-Text | `text-gray-900` | `dark:text-white` |
| Button-Hover | `hover:bg-gray-300` | `dark:hover:bg-gray-700` |
| Button-Background-Active | `bg-gray-200` | `dark:bg-gray-600` |
