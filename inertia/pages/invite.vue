<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useForm } from '@inertiajs/vue3'
import Alertmessage from '~/components/alertmessage.vue'
const validateError = ref(null)
const props = defineProps<{
  message: Record<string, string | Record<string, string | string[]>>
}>()
const payload = useForm({
  uid: ref(''),
})
const clearErr = () => {
  validateError.value = null
}
watchEffect(() => {
  if (props.message?.errors?.validate) {
    validateError.value = props.message?.errors
  }
})
</script>
<template>
  <div>
    <div class="bg-base-200 flex items-center justify-center min-h-screen">
      <video autoplay loop muted class="fixed z-0">
        <source src="/uploads/3201313-hd_1080_1920_25fps.mp4" type="video/mp4" class="h-screen" />
        Your browser does not support the video tag.
      </video>
      <div class="backdrop-blur-sm bg-white/30 fixed w-screen h-screen"></div>
      <div class="card w-96 backdrop-blur-md bg-white/30 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-6">Sign In</h2>
          <form method="post" @submit.prevent="payload.post('/login', payload)">
            <div class="form-control mt-2">
              <Alertmessage :message="validateError" />
              <label class="label">
                <span class="label-text">Secret</span>
              </label>
              <label
                class="input input-bordered backdrop-blur-md bg-white/10 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  v-on:keyup="clearErr"
                  v-model="payload.uid"
                  class="grow"
                  placeholder=""
                />
              </label>
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>