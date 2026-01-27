<!-- 封装柱状图组件 -->
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref ,onMounted} from 'vue';
interface Bar{
    name?:string
    value:number
    age?:number
}
const chartRef=ref(null)
const props=defineProps<{
    title:String,
    data:Bar[]
}>()
//初始化柱状图
onMounted(()=>{
    if(!chartRef) return
    const chart=echarts.init(chartRef.value)
    const option = {
    title: {
      text: props.title,
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: props.data.map(item=>item.name??item.age),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: props.data,
        itemStyle: {
          color: '#409eff',
        },
      },
    ],
  };
  chart.setOption(option)
})
</script>
<template>
<div ref="chartRef" style="width: 300px;height: 300px;"></div>
</template>