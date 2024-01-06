<script setup>
import { ref } from 'vue'
import { storage, auth, songsCol } from '@/includes/firebase'
import { toast } from 'vue3-toastify'
import { onBeforeUnmount } from 'vue'

// Data
const isDragOver = ref(false)
const uploads = ref([])
// Methods
const upload = ($event) => {
  isDragOver.value = false
  const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [$event.target.files]
  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') {
      toast.error('There Is something wrong!', {
        autoClose: 5000,
        closeButton: true
      })
      return
    }
    const storageRef = storage.ref()
    const songsRef = storageRef.child(`songs/${file.name}`)
    const task = songsRef.put(file)
    const progress = ref()
    const progressClass = ref('bg-blue-500')
    const icon = ref('fas fa-spinner fa-spin')
    const textClass = ref('')
    const cancelIcon = ref(true)

    // Upload Object
    uploads.value.push({
      task,
      progress,
      name: file.name,
      class: progressClass,
      icon,
      text: textClass,
      cancelIcon
    })

    task.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        switch (snapshot.state) {
          case 'paused':
            // console.log('Upload is paused')
            break
          case 'running':
            // console.log('Upload is running')
            break
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        progressClass.value = 'bg-red-500'
        icon.value = 'fas fa-times'
        textClass.value = 'text-red-500'
        cancelIcon.value = false
        console.log(error)
      },
      async () => {
        const song = {
          uuid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          originalName: task.snapshot.ref.name,
          modifiedName: task.snapshot.ref.name,
          genre: '',
          comment_count: 0
        }
        song.url = await task.snapshot.ref.getDownloadURL()
        await songsCol.add(song)

        // TODO: read document from firebase for getDownloadURL() function
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        // getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        // })
        toast.success('File successfully uploaded!', {
          autoClose: 2500,
          closeButton: true
        })
        progressClass.value = 'bg-green-500'
        icon.value = 'fas fa-check'
        textClass.value = 'text-green-500'
        cancelIcon.value = false
      }
    )
  })
}

const cancelUpload = (item) => {
  const uploadItem = uploads.value.find((upload) => upload == item)
  uploadItem.task.cancel()
}

onBeforeUnmount(() => {
  uploads.value.forEach((upload) => {
    upload.task.cancel()
  })
})
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
        <input type="file" multiple @change="upload($event)" />
        <hr class="my-6" />
        <!-- Progress Bars -->
        <div v-for="(item, index) of uploads" class="mb-4" :key="index">
          <!-- File Name -->
          <div class="font-bold text-sm" :class="item.text">
            <i :class="item.icon" />
            {{ item.name }}
          </div>
          <div class="flex h-5 overflow-hidden rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar"
              :class="item.class"
              :style="{ width: item.progress + '%' }"
            ></div>
            <span
              :style="item.cancelIcon ? 'display:grid;' : 'display:none;'"
              @click="cancelUpload(item)"
              class="ml-auto text-lg cursor-pointer grid place-items-center rounded-full"
              >X</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
