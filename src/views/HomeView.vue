<script lang="ts" setup>
import {Modal} from 'flowbite-vue'
import {ref} from 'vue'
import ButtonDefaultStyle from '@/components/ButtonDefaultStyle.vue'

const isShowModal = ref(false)

function closeModal() {
  isShowModal.value = false
}

function showModal() {
  isShowModal.value = true
}
</script>

<template>
  <h1>You did it!</h1>
  <main>
    <ButtonDefaultStyle :button="{ text: 'Click me' }" @click="showModal"/>

    <Modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">Terms of Service</div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed">
          With less than a month to go before the European Union enacts new consumer privacy laws
          for its citizens, companies around the world are updating their terms of service
          agreements to comply.
        </p>
        <p class="text-base leading-relaxed">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
          25 and is meant to ensure a common set of data rights in the European Union. It requires
          organizations to notify users as soon as possible of high-risk data breaches that could
          personally affect them.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <ButtonDefaultStyle
              :button="{ text: 'Decline' }"
              class="hover:bg-red-400 dark:hover:bg-red-500"
              @click="closeModal"
          />
          <ButtonDefaultStyle
              :button="{ text: 'I accept' }"
              class="hover:bg-green-400 dark:hover:bg-green-500"
              @click="closeModal"
          />
        </div>
      </template>
    </Modal>
  </main>
</template>
