<template>
  <div class="map-container">
    <!-- 搜索栏容器 -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchKeyword"
        placeholder="请输入要搜索的地名..."
        @keyup.enter="performSearch"
      />
      <button @click="performSearch">搜索</button>
    </div>
    <!-- 地图容器 -->
    <div id="tianDiTuContainer" ref="mapRef"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// 获取 DOM 元素的引用
const mapRef = ref(null)
let mapInstance = null // 保存地图实例

// 搜索关键词
const searchKeyword = ref('')

onMounted(() => {
  // 确保 DOM 已挂载且天地图 API 已加载
  if (window.T) {
    // 初始化地图，使用球面墨卡托投影 (EPSG:3857)
    mapInstance = new T.Map('tianDiTuContainer', {
      projection: 'EPSG:3857', // 使用球面墨卡托投影
      center: [12958149.0512, 4826914.2807], // 初始中心点设为北京 (墨卡托坐标)
      zoom: 10, // 初始缩放级别
      minZoom: 1, // 最小缩放级别
      maxZoom: 13, // 最大缩放级别
    })

    // 添加影像图层 (球面墨卡托投影)
    const imgLayer = new T.TileLayer(
      'http://t0.tianditu.gov.cn/img_w/wmts?tk=1316582edd2271522aae915e23c3cab6&L={z}&Y={y}&X={x}',
    )
    mapInstance.addLayer(imgLayer)

    // 添加比例尺控件
    const scaleControl = new T.Control.Scale()
    mapInstance.addControl(scaleControl)

    // 添加鹰眼图控件
    const overviewMapControl = new T.Control.OverviewMap()
    mapInstance.addControl(overviewMapControl)

    console.log('天地图影像图 (球面墨卡托投影) 初始化成功')
  } else {
    console.error('天地图 API 未加载，请检查 script 标签或网络连接')
  }
})

// 搜索定位函数
const performSearch = () => {
  if (!searchKeyword.value.trim()) {
    alert('请输入搜索关键词')
    return
  }

  const searchUrl = `http://api.tianditu.gov.cn/v2/search?postStr={"keyWord":"${encodeURIComponent(searchKeyword.value.trim())}","level":12,"mapBound":"-180,-90,180,90","queryType":7,"start":0,"count":1}&type=query&tk=1316582edd2271522aae915e23c3cab6`

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('搜索结果:', data)
      if (data.status?.infocode === 1000) {
        if (data.pois && data.pois.length > 0) {
          const firstResult = data.pois[0]
          const [lng, lat] = firstResult.lonlat.split(',').map(Number)
          mapInstance.centerAndZoom(new T.LngLat(lng, lat), 18)
          // 添加标记点...
          const marker = new T.Marker(new T.LngLat(point.x, point.y))
          mapInstance.clearOverLays()
          mapInstance.addOverLay(marker)
          const infoWin = new T.InfoWindow(firstResult.name || '搜索结果')
          marker.openInfoWindow(infoWin)
          console.log(
            `定位到: ${firstResult.name}, 经纬度: [${lng}, ${lat}], 墨卡托: [${point.x}, ${point.y}]`,
          )
        } else {
          alert('未找到相关地点')
        }
      } else {
        alert('搜索失败，请稍后重试')
      }
    })
}

// 组件卸载时销毁地图实例
import { onUnmounted } from 'vue'

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy()
    console.log('天地图已销毁')
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh; /* 占满整个视口高度 */
  position: relative; /* 为搜索栏定位做准备 */
}

/* 搜索栏样式 */
.search-bar {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000; /* 确保搜索栏在地图之上 */
  display: flex; /* 使用弹性布局排列输入框和按钮 */
  gap: 5px; /* 输入框和按钮之间的间距 */
}

.search-bar input {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px; /* 设置输入框宽度 */
}

.search-bar button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

#tianDiTuContainer {
  width: 100%;
  height: 100%;
}
</style>
