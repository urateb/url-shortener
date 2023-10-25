<script setup>
import { ref } from "vue";
import axios from 'axios';

const openMenu = ref(false)
const option = ref('Add expiration date')
const setOption = (val) => {
    option.value = val
    openMenu.value = false
}
const optionList = ref(['1 minute', '5 minutes', '30 minutes', '1 hour', '5 hours'])
const longUrl = ref('')
const links = ref([])
const emit = defineEmits(['updateUrlList']);
const addToList = async (item) => {
    const shortenedUrl = await shortenUrl(item);

    if (shortenedUrl) {
        const expirationTime = option.value;
        links.value.push({ url: shortenedUrl, expiration: expirationTime });
        emit('updateUrlList', links.value);
        longUrl.value = '';
        startTimeout(shortenedUrl, expirationTime);
    }

}
const startTimeout = (url, expirationTime) => {
    let delay = 0;

    if (expirationTime.includes('minute')) {
        const minutes = parseInt(expirationTime) || 1;
        delay = minutes * 60 * 1000;
    } else if (expirationTime.includes('hour')) {
        const hours = parseInt(expiration) || 1;
        delay = hours * 60 * 60 * 1000;
    } else {
    }

    setTimeout(() => {
        const index = links.value.findIndex(link => link.url === url);
        if (index !== -1) {
            links.value.splice(index, 1);
            emit('updateUrlList', links.value);
        }
    }, delay);
}
const shortenUrl = async (longUrl) => {
    const apiKey = '10ec5731116ecd3016dc855c37485899dd807e8b';
    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';

    try {
        const response = await axios.post(apiUrl, { long_url: longUrl }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.link;
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
};
</script>
<template>
    <div class="sm:p-20 p-12 flex flex-col w-full min-h-screen">
        <h1 class="sm:text-4xl text-2xl font-semibold">URL Shortener</h1>

        <div class="sm:pt-16 pt-8 flex sm:flex-row flex-col w-full sm:w-[90%] gap-x-6">
            <div class="sm:w-2/3 w-full flex flex-col relative sm:pb-0 pb-4">
                <input type="url" name="url" id="url" placeholder="Paste the URL to be shortened" class="
                      focus-visible:outline-none
                      block
                      w-full
                      placeholder-dark-grey
                      font-light
                      border
                      border-dark-grey
                      p-2.5
                    " v-model="longUrl" />
                <button @click="addToList(longUrl)"
                    class="bg-dark-magenta hover:bg-dark-magenta/90 transition-colors duration-200 inline-flex justify-center items-center text-white text-lg mt-8 py-3 px-6 max-w-fit">
                    Shorten URL
                </button>
            </div>
            <div class="sm:w-1/3 w-full">
                <div class="relative">
                    <button @click="openMenu = !openMenu" class="
                      block
                      w-full
                      text-left
                      text-dark-grey
                      font-light
                      border
                      border-dark-grey
                      p-2.5
                      hover:bg-light-grey/20
                      relative
              ">
                        {{ option }}
                        <img src="/src/assets/icons/chevron-down.svg" class="absolute right-2 top-2 w-7" />
                    </button>
                    <ul class="absolute w-full mt-2" v-if="openMenu">
                        <li v-for="(item, index) in optionList" :key="index"
                            :class="[index == optionList.length - 1 ? 'border-b' : 'border-b-0']" class="cursor-pointer select-none hover:bg-light-grey/40 focus-visible:outline-dark-magenta
                      block
                      w-full
                      text-dark-grey
                      font-light
                      border text-center
                      border-dark-grey
                      p-2.5
                      relative" @click="setOption(item)">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

