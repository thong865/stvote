<template>
  <div>
    <dialog ref="my_modal_3" id="my_modal_3" class="modal">
      <div class="modal-box backdrop-blur-sm bg-white/30">
        <form method="dialog">
          <button class="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <CVoted :data="dt" v-if="udata.find((t)=> t.id == data?.id)?.votes.length != 0" />
        <div v-if="!data?.votes[0] && udata.find((t)=> t.id == data?.id)?.votes.length == 0">
          <div class="text-2xl mb-5 text-primary">Point</div>

          <div class="grid mt-3 grid-cols-3 gap-1">
            <input
              class="btn text-3xl glass text-primary"
              type="radio"
              name="options"
              :value="i"
              v-model="number"
              :aria-label="i"
              v-for="i in 10"
              :key="i"
            />
          </div>
          <button @click="handVote" class="btn btn-primary w-full mt-10">Vote</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CVoted from '~/components/voted.vue'
import { router } from '@inertiajs/vue3'
import axios from 'axios'
const props = defineProps({
  data: Object,
  udata: Object,
  setpoint: Number,
})
const mActive = ref(false)
const number = ref(0)
const emit = defineEmits(['update:setpoint'])
const point = ref(props?.data)
const dt = computed(()=> {
  return props.udata.find((t)=> t.id == props.data?.id)
})
watch(number, () => {
  emit('update:setpoint', number.value)
})

const handVote = async () => {
  const res = await axios.put(
    '/api/slogan_vote',
    Object.assign(props?.data, { vote: number.value }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (res.status == 200) {
    const el = document.getElementById('my_modal_3')
    number.value = ref(0)
    el.close()
    router.reload()
  }
  mActive.value = true
}
</script>

<style>
</style>