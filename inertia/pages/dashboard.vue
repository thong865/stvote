<template>
  <div>
    Dashboard
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{
  data: SerializedFVote[]
}>()
onMounted(async () => {
  // try {
  //   const subscription = transmit.subscription('cvote')
  //   await subscription.create()
  //   subscription.onMessage((t) => {
  //     const ix = props.data.findIndex((x) => x.iid === t.fid.imgName)
  //     props.data[ix].cov = Number(props.data[ix].cov) + Number(t.fid.vote)
  //   })
  //   console.log(window.location.origin)
  // } catch (e) {
  //   console.log(e)
  // }
})
</script>

<style>
</style>