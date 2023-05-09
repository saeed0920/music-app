<template>
  <!-- Header -->
  <header id="header" class="bg-[#656c73] shadow-sm">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="toggle">Login / Register</a>
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia'
import useModalStore from '../stores/modal'
export default {
  name: 'appHeader',
  data() {
    return {
      check: 'test for somehting'
    }
  },
  computed: {
    ...mapStores(useModalStore),
    ...mapWritableState(useModalStore, ['isOpen'])
  },
  methods: {
    toggle() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      // this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped></style>
