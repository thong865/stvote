<template>
  <div>
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
    <div class="text-2xl text-primary text-center mt-4">ທ່ານໄດ້ໂຫວດແລ້ວ ດ້ວຍຄະແນນ</div>
    <div class="text-5xl text-error text-center">{{ props.data?.votes[0]?.vote || 0 }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
})
</script>

<style>
</style>