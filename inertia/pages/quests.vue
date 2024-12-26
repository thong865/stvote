<script setup>
import { watchEffect, ref, watch  } from 'vue'
import { router } from '@inertiajs/vue3'
import Menthanks from '~/components/menthanks.vue'
const props = defineProps({
  data: ref(null),
  datGroup: ref(null)
})
const sorce = ref(0)
const search = ref('')
const itup = ref()
let datg = ref([])
const handleChange = (t) => {
    itup.value = t
  router.put(
    '/api/guest_enter',
    { id: t.id, enter: t.enter },
    {
      preserveScroll: true,
      onSuccess: () => {
        const el = document.getElementById('my_modal_4')
        el?.show()
      },
    }
  )
}
watch(search,() => {
    router.get('/quests', { q: search.value }, { preserveState: true })
})
setTimeout(() => {
  datg.value = props.datGroup
}, 1000)
</script>

<template>
  <div>
    <div>
      <h1 class="text-center text-2xl">ລົງທະບຽນຮ່ວມງານ</h1>
    </div>
    <div class="flex">
      <!-- <select class="select select-ghost w-full max-w-xs" v-model="sorce">
        <option selected value="0">ທັງໝົດ</option>
        <option :value="t?.id" v-for="(t, i) in datg" :key="i">{{ t?.orgName }}</option>
      </select> -->

      <label class="input input-bordered flex items-center gap-2">
        <input type="text" v-model="search" class="grow" placeholder="ຄົ້ນຫາຕາມຊື່ ແລະ ນາມສະກຸນ" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>
    <div
      class="flex justify-between items-center gap-3 bg-white mt-1 py-2 px-4 rounded-xl"
      v-for="(t, i) in props.data"
      :key="i"
    >
      <div>
        <div class="font-bold">{{ t.fullname }}</div>
        <div class="text-sm opacity-50">{{t.orgs?.orgName}} | {{t.dept}}</div>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            type="checkbox"
            class="toggle toggle-accent"
            @change="handleChange(t)"
            v-model="t.enter"
          />
        </label>
      </div>
    </div>
    <Menthanks :data="itup"/>
  </div>
</template>