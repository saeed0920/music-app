<template>
  <!-- Header -->
  <header id="header" class="bg-[#656c73] shadow-sm">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        to="/"
        exact-active-class="text-purple-500"
        class="text-white font-bold uppercase text-2xl mr-4"
        href="#"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link to="/about" class="px-2 text-white">About</router-link>
          </li>
          <li v-if="!userLogIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggle">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <RouterLink to="/manage" class="px-2 text-white">Manage</RouterLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="logOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapStores, mapWritableState, mapActions } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'
export default {
  name: 'appHeader',
  data() {
    return {
      check: 'test for something'
    }
  },
  computed: {
    ...mapStores(useModalStore),
    ...mapWritableState(useModalStore, ['isOpen']),
    ...mapWritableState(useUserStore, ['userLogIn'])
  },
  methods: {
    ...mapActions(useUserStore, ['logOut']),
    toggle() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      // console.log(this.bruh)
      // this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped></style>
