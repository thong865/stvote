<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3'
import Axios from 'axios'
import abbreviate from 'number-abbreviate'
// var numAbbr = new abbreviate()
defineProps<{
  data: SerializedUser[]
}>()
const handVote = async () => {
  const rs = await Axios.put('/api/slogan_vote')
  console.log(rs)
}

</script>

<template>
  <div>
    <!-- {{ data }} -->
    <div class="">
      <img class="" src="https://plus.unsplash.com/premium_photo-1716208802289-3bb24a28df72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="">
    </div>
    <div class="container flex mx-auto w-full items-center justify-center">
      <ul class="flex flex-col p-4">
        <li class="border-gray-400 flex flex-row mb-2" v-for="(t, i) in data" :key="i">
          <div
            class="cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="flex-1 pl-1 mr-16">
              <div class="font-medium">{{ t.title }}</div>
            </div>
            <div class="text-gray-600 text-xs">
              <button
                @click="handVote"
                class="rounded-md bg-slate-800 p-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                  /></svg
                >{{ abbreviate(t.vote_count || 0, 1) }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>