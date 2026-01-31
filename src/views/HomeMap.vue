<!-- HomeMap.vue -->
<template>
  <div class="map-container">
    <div id="tianDiTuContainer" ref="mapRef"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// 获取 DOM 元素的引用
const mapRef = ref(null);

let mapInstance = null; // 保存地图实例

onMounted(() => {
  // 确保 DOM 已挂载且天地图 API 已加载
  if (window.T) {
    // 初始化地图，使用球面墨卡托投影 (EPSG:3857)
    mapInstance = new T.Map('tianDiTuContainer', {
      projection: 'EPSG:3857', // 使用球面墨卡托投影
      center: [12958149.0512, 4826914.2807], // 初始中心点设为北京 (墨卡托坐标)
      zoom: 10, // 初始缩放级别
    });

    // 添加影像图层 (球面墨卡托投影)
    // 注意：将 YOUR_TIAN_MAP_KEY 替换为您从天地图官网获取的真实密钥
    const imgLayer = new T.TileLayer('http://t0.tianditu.gov.cn/img_w/wmts?tk=1316582edd2271522aae915e23c3cab6&L={z}&Y={y}&X={x}');
    mapInstance.addLayer(imgLayer);

    // 添加比例尺控件
    const scaleControl = new T.Control.Scale();
    mapInstance.addControl(scaleControl);

    // 添加鹰眼图控件
    const overviewMapControl = new T.Control.OverviewMap();
    mapInstance.addControl(overviewMapControl);

    console.log('天地图影像图 (球面墨卡托投影) 初始化成功');
  } else {
    console.error('天地图 API 未加载，请检查 script 标签或网络连接');
  }
});

// 组件卸载时销毁地图实例
import { onUnmounted } from 'vue';

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy();
    console.log('天地图已销毁');
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh; /* 占满整个视口高度 */
  position: relative;
}

#tianDiTuContainer {
  width: 100%;
  height: 100%;
}
</style>