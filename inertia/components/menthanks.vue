<template>
  <div>
    <dialog ref="my_modal_4" id="my_modal_4" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-lg btn-circle btn-ghost absolute right-2 top-2"
            @click="handleClose"
          >
            ✕
          </button>
        </form>
        <div class="grid justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20 stroke-success shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            v-if="data?.success"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-2xl text-primary text-center mt-4">
          {{
            data?.success
              ? 'ຂອບໃຈ ສຸກສັນວັນ ຄຣິສມາດ'
              : data?.success == false && data?.enter == false
              ? 'ທ່ານແນ່ໃຈວ່າຈະກົດຍົກການເຂົ້າຮ່ວມງານ'
              : 'ຂໍອະໄພ ທ່ານບໍ່ສາມາດ ຢືນຢັ້ນ 2 ຄັ້ງໄດ້'
          }}
        </div>
        <form method="dialog" v-if="cv == t?.kcf && data?.enter == false">
          <button class="btn btn-sm" @click="handleChange">ຕົກລົງ</button>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useLocalStorage } from '@vueuse/core'
const cv = ref(useLocalStorage('KCER'))
const props = defineProps({
  data: Object,
  t: Object,
})
const handleClose = () => {
  router.reload()
}
const handleChange = async () => {
  router.post(
    '/api/guest_leave',
    { id: props.t?.id, enter: props.t?.enter },
    {
      preserveScroll: true,
      onSuccess: () => {
        router.reload()
      },
    }
  )
}
</script>

<style>
</style>