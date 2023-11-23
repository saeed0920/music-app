<script setup>
import { ref } from 'vue'
import { storage } from '@/includes/firebase'
// Data
const isDragOver = ref(false)

// Methods
const upload = ($event) => {
  isDragOver.value = false
  const files = [...$event.dataTransfer.files]
  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') return
    const storageRef = storage.ref()
    const songsRef = storageRef.child(`songs/${file.name}`)
    songsRef.put(file)
  })
}
</script>
<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          :class="{ 'border-solid border-green-400 bg-green-400': isDragOver }"
          @drag.prevent.stop=""
          @drop.prevent.stop="upload($event)"
          @dragend.prevent.stop="isDragOver = false"
          @dragleave.prevent.stop="isDragOver = false"
          @dragover.prevent.stop="isDragOver = true"
          @dragenter.prevent.stop="isDragOver = true"
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        >
          <h5>Drop your files here</h5>
        </div>
        <hr class="my-6" />
        <!-- Progress Bars -->
        <div class="mb-4">
          <!-- File Name -->
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div class="transition-all progress-bar bg-blue-400" style="width: 75%"></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <div class="transition-all progress-bar bg-blue-400" style="width: 35%"></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <div class="transition-all progress-bar bg-blue-400" style="width: 55%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
