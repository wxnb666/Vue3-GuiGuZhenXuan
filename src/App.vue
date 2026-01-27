<script setup lang="ts">
import { ref } from 'vue'
import BarChart from './components/barChart.vue'
const title = ref('男女人数统计')
const data = ref([
  {
    name: '男性',
    value: 90,
  },
  {
    name: '女性',
    value: 120,
  },
])
const title1 = ref('王者年龄统计')
const data2 = ref([
  {
    age: 12,
    value: 100,
  },
  {
    age: 15,
    value: 180,
  },
  {
    age: 18,
    value: 200,
  },
])
</script>

<template>
  <router-view>
    <BarChart :data="data" :title="title"></BarChart>
    <barChart :data="data2" :title="title1"></barChart>
  </router-view>
</template>

<style scoped></style>
