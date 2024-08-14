<script setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from "vue-router";
import upload from '@/components/upload.vue'
import { songsCol,  auth } from '@/includes/firebase.js';
import compostionItem from '@/components/CompositionItem.vue';

const songs = ref([]);
const uploadComponent = ref(null);
onBeforeRouteLeave((to, from, next) =>  {
    uploadComponent.value.cancelAllUploads();
    next();
})

 onMounted(async () => { 
  const snapShot = await songsCollection.where('uid' , '==' , auth.currentUser.uid).get(); 
  snapShot.forEach((document) => {
  const song = {
  ...document.data(),
  docID : document.id,
    };
  })
  songs.value.push(song);
  console.log(songs.value);
})

</script>
<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <upload ref="uploadComponent" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <compostionItem v-for="(song,index) of songs" :key="index" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 b bg-white px-4 py-2 w-full">
    <!-- Track Info --
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="fa fa-play text-gray-500 text-xl"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>
</template>
