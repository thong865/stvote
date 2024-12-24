<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<template>
  <swiper
    direction="vertical"
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(t, i) in itm" :key="i">
      <div class="w-full h-screen content-center">
        <div class="z-1 px-5">
          <img :src="`/uploads/${t.filename}?tmp=1`" alt="" srcset="" />
        </div>
        <div class="absolute bottom-10 flex px-5 py-10 mx-auto w-full">
            <button class="btn w-full btn-error" onclick="my_modal_3.showModal()">
              {{ t.votes[0] ? 'Votted' : 'Vote' }}
            </button>
          </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
  <script setup>
import 'swiper/css'
import { ref } from 'vue'
import Axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/vue'
const emit = defineEmits(['update:curactive'])
const props = defineProps({
  itm: Object,
  curactive: Object,
})
const onSwiper = (swiper) => {
  emit('update:curactive', props.itm[swiper.activeIndex])
}
const onSlideChange = (swiper) => {
  emit('update:curactive', props.itm[swiper.activeIndex])
}
</script>