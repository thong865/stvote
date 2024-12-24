<script setup lang="ts">
import { Transmit } from '@adonisjs/transmit-client'
import { onMounted } from 'vue'
const props = defineProps<{
  data: SerializedFVote[]
}>()
onMounted(async () => {
  try {
    const transmit = new Transmit({
      baseUrl: window.location.origin,
      maxReconnectionAttempts: 5,
      onReconnectAttempt: (attempt) => {
        console.log('Reconnect attempt ' + attempt)
      },
      onReconnectFailed: () => {
        console.log('Reconnect failed')
      },
    })
    const subscription = transmit.subscription('cvote')
    await subscription.create()
    subscription.onMessage((t) => {
      const ix = props.data.findIndex((x) => x.iid === t.fid.imgName)
      props.data[ix].cov = Number(props.data[ix].cov) + Number(t.fid.vote)
    })
  } catch (e) {
    console.log(e)
  }
})
</script>
  
  <style>
</style>
<template>
  <div>
    <div class="flex justify-between">
      <div></div>
      <button class="btn btn-primary mt-4 mr-2">ຈັດລຽງ</button>
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in data" :key="i">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle h-12 w-12">
                    <img
                      :src="`/uploads/${t.filename}?tmp=1`"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{ t.iid }}</div>
                  <div class="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td class="text-center bg-white/80 rounded-xl">
              <span class="text-2xl">{{ t.cov }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
