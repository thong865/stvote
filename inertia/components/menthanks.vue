<template>
  <div>
    <dialog ref="my_modal_4" id="my_modal_4" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="grid justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20 stroke-success shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-2xl text-primary text-center mt-4">ຂອບໃຈ ສຸກສັນວັນ ຄຣິສມາດ</div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: Object,
})
</script>

<style>
</style>