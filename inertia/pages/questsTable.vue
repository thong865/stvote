<script setup>
import { watchEffect, ref, watch, onMounted, reactive, computed } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import { useLocalStorage } from '@vueuse/core'
import Menthanks from '~/components/menthanks.vue'
import Carditem from '~/components/carditem.vue'
import axios from 'axios'
const props = defineProps({
  data: undefined,
  datGroup: ref(null),
})
const cv = ref(useLocalStorage('KCER'))
const sorce = ref(0)
const search = ref('')
const itup = ref()
const seltem = ref()
let datg = reactive(computed(() => props.data))
const handleChange = async (t) => {
  const res = await axios.post(
    '/api/guest_enter',
    { id: t.id, enter: t.enter, cv: cv.value },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (res.status == 200) {
    itup.value = res.data
    const el = document.getElementById('my_modal_4')
    el?.show()
  }
  if (res.status == 201) {
    itup.value = res.data
    seltem.value = t
    const el = document.getElementById('my_modal_4')
    el?.show()
  }
}
watch(search, () => {
  router.get('/quests', { q: search.value }, { preserveState: true })
})
</script>

<template>
  <div>
    <Head title="Guests" />
    <div>
      <h1 class="text-center text-2xl">ລົງທະບຽນຮ່ວມງານ</h1>
    </div>
    <div class="flex">
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
    <div class="overflow-x-auto">
      <table class="table table-xs">
        <thead>
          <tr>
            <th>ຄຳນຳໜ້າ ຊື່ ນາມສະກຸນ</th>
            <th>ໜ້າທີ່ຮັບຜິດຊອບ</th>
            <th>ພາກສ່ວນ</th>
            <th>ບ່ອນປະຈຳການ</th>
            <th>ຝ່າຍ</th>
            <th>ໜ່ວຍງານ / ໜ່ວຍບໍລິການ</th>
            <th>ສະຖານະ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t,i) in data" :key="i">
            <th>{{t.fullname}}</th>
            <td>{{t.jobdesc}}</td>
            <td>{{t.orgName}}</td>
            <td>{{t.jobdesc}}</td>
            <td>{{t.jobdesc}}</td>
            <td>{{t.jobdesc}}</td>
            <td>{{t.jobdesc}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>