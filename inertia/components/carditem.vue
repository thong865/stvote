
<script setup>
import { computed } from 'vue';

const props = defineProps({
  org: {
    type:String,
    default:''
  }
})
const d = computed(()=> props.org)
</script>

<style>
</style>
<template>
  <div>
      <div class="text-sm opacity-50">{{ d }} adfasfd</div>
  </div>
</template>
