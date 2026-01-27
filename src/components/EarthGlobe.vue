<!-- 3D地球组件 -->
 <script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';
import earthImg from '../../public/assets/image.png';
import starfieldImg from '../../public/assets/image copy.png';
const props=defineProps<{
   baseTexture?: string;           // 地球贴图
  environment?: string;           // 环境贴图（星空）
  shading?: 'lambert' | 'phong';   // 光照模型
  atmosphere?: boolean;           // 是否显示大气层
  ambientIntensity?: number;      // 环境光强度
  mainIntensity?: number; 
}>();

const mapRef=ref(null)
let chartInstance: echarts.ECharts | null = null;
onMounted(()=>{
    if(!mapRef)return
    chartInstance=echarts.init(mapRef.value, 'gl')
  const option = {
    backgroundColor: '#000', // 黑色背景
    globe: {
   baseTexture: earthImg,
    environment: starfieldImg,
      shading: 'lambert', // 光照模型
      atmosphere: {
        show: true, // 是否显示大气层
      },
      viewControl: {
        autoRotate: true, // 自动旋转
      },
    },
    light: {
      ambient: {
        intensity: props.ambientIntensity ?? 0.1,
      },
      main: {
        intensity: props.mainIntensity ?? 1.5,
      },
    },
    series: [],
  };
  chartInstance.setOption(option)
})
</script>

<template>
<div ref="mapRef" style="width: 500px;height: 500px;"></div>
</template>