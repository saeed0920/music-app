<script setup lang="ts">
const props = defineProps({
  warning: {
    type: Boolean,
    default: false,
    required: false
  },
  error: {
    type: Boolean,
    default: false,
    required: false
  },
  info: {
    type: Boolean,
    default: false,
    required: false
  },
  successful: {
    type: Boolean,
    default: false,
    required: false
  },
  icon: {
    type: String,
    default: '',
    required: false
  },
  text: {
    type: String,
    default: '',
    required: true
  },
  position: {
    type: Object,
    default: () => ({
      top: false,
      right: false,
      left: false,
      bottom: false
    }),
    required: false
  }
})
</script>
<template>
  <div
    class="flex flex-col fixed border-gray-500 p-4 item-center z-10"
    :class="{
      'bottom-0 border-t-2': position.bot,
      'top-0 border-b-2': position.top,
      'right-0 border-l-2': position.right,
      'left-0 border-r-2': position.left
    }"
  >
    <label>{{
      successful ? 'Successful' : info ? 'Info' : warning ? 'Warning' : error ? 'Error' : ''
    }}</label>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<style scoped></style>
