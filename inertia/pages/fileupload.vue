<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const file = ref(null)
const sfile = ref()
const onFileChanged = async ($event: Event) => {
  const res = await axios.post('/fileuploadtmp', file.value.files, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  sfile.value = res.data
}

const onFileupload = async()=> {
    const res = await axios.post('/fileStore',{payloads:sfile.value })
}

</script>

<template>
  <div>
    <input ref="file" type="file" multiple accept="image/*" capture v-on:change="onFileChanged" />
    <div
      class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
          ຕົວຢ່າງອັບໂຫລດ
        </h5>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="" v-for="(t,i) in sfile" :key="i">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="w-20 h-20"
                  :src="`/uploads/${t.filename}?tmp=1`"
                  alt="Neil image"
                />
              </div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{{t.iid}}</p>
                <input type="text" v-model="t.remark" placeholder="Remark">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button @click="onFileupload">Save</button>
  </div>
</template>