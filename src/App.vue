<script setup>
import Sidebar from "./components/Sidebar.vue"
import Main from "./components/Main.vue"
import { ref } from "vue";

const shortenedUrlList = ref([])
const handleUpdatedUrlList = (list) => {
  shortenedUrlList.value = list
}

</script>

<template>
  <div class="flex w-full min-h-screen md:flex-row flex-col">
    <div class="md:w-1/4 w-full">
      <Sidebar :urlList="shortenedUrlList" />
    </div>
    <div class="md:w-3/4 w-full">
      <Main @updateUrlList="handleUpdatedUrlList" />
    </div>

  </div>
</template>
