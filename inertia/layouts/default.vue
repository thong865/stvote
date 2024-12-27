<script setup>
import { useStorage } from '@vueuse/core'
import { onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
const getverkey = ()=> {
    const kev =  localStorage.getItem('KCER')
    const uid = uuidv4()
    if(!kev){
      localStorage.setItem('KCER',uid)
    }
}
onMounted(()=> {
  getverkey();
})
</script>

<template>
  <div>
    <div class="bg-[url('/uploads/bg.jpg')] w-screen h-screen">
        <slot />
    </div>
  </div>
</template>
