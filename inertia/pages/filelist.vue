<script setup lang="ts">
defineProps<{
  data: SerializedFile[]
}>()
</script>

<template>
    <div>
        <button>Uploads</button>
       <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Department</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(t,i) in data" :key="i">
                <td><img class="h-20" :src="`/uploads/${t.filename}?tmp=1`" alt="" srcset=""></td>
                <td>{{ t.remark }}</td>
                <td>Vote|</td>
            </tr>
        </tbody>
       </table>
    </div>
</template>