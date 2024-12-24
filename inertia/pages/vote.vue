<script setup lang="ts">
import { ref } from 'vue'
import Swipimg from '~/components/swipimg.vue'
import Movoate from '~/components/movote.vue'
const itActive = ref(null)
const votePoint = ref(0)
const props = defineProps<{
  data: Record<string, string | Record<string, string | string[]>>
}>()
</script>

<template>
  <div>
    <div class="w-screen h-screen relative">
      <video autoplay loop muted class="fixed z-0">
        <source src="/uploads/6098984-hd_1080_1920_25fps.mp4" type="video/mp4" class="h-screen" />
        Your browser does not support the video tag.
      </video>
      <div class="absolute h-screen w-screen">
        <div class="text-4xl text-center pt-5 absolute z-10 w-full">Chirstmas</div>
        <Swipimg :itm="data" v-model:curactive="itActive" />
        <Movoate :data="itActive" v-model:setpoint="votePoint" />
      </div>
    </div>
  </div>
</template>