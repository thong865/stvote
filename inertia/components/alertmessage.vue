<template>
  <div>
    <template v-if="alt.type == 'error'">
      <div role="alert" class="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ props.message }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
const alt = ref({
  type: ref(null),
})
const props = defineProps({
  message: Object,
})
watchEffect(() => {
  if (props.message && props.message?.validate) {
    alt.value.type = 'error'
  } else {
    alt.value.type = null
  }
})
</script>
