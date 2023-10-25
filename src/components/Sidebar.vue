<script setup>

const props = defineProps({
    urlList: Object
})
const deleteItem = (index) => {
    props.urlList.splice(index, 1);
};
</script>
<template>
    <div class="bg-light-grey sm:min-h-screen p-12 flex flex-col w-full">
        <div class="flex justify-center sm:justify-start">
            <img src="/anchorzup-logo.svg" class="w-56 sm:w-52" />
        </div>
        <h4 class="pb-3 sm:pb-6 sm:pt-16 pt-8  text-xl font-semibold">My shortened URLs</h4>
            <div v-for="(link, index) in urlList" :key="index" class="flex justify-between items-center py-2">
                <a class="text-light-blue underline" target="_blank" :href="link.url">{{ link.url }}</a>
                <p class="text-dark-grey text-sm">{{ link.expiration }}</p>
                <button @click="deleteItem(index)"><img src="/src/assets/icons/delete.svg" /></button>
            </div>
    </div>
</template>

