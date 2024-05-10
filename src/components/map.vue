<template>
  <div id="mapbox">
    <div id="mars3dContainer"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
//引入cesium基础库
import * as mars3d from "mars3d";
import options from "./img/data-view-config.json";
import { Cesium } from "mars3d";
// import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
let map: any = null;
function initmap() {
  map = new mars3d.Map("mars3dContainer", options);
  loadmodel();
//   loadbox();
}

function loadmodel() {
  //   console.log(222, process.env.BASE_URL);
  let tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "工厂区域",
    // url: "http://saasmodel.oss-cn-shanghai.aliyuncs.com/b3dm/%E5%BE%B7%E5%B7%9E%E4%BA%BA%E6%B0%91%E8%AD%A6%E5%AF%9F%E8%AE%AD%E7%BB%83%E5%9F%BA%E5%9C%B0/terra_b3dms/tileset.json",
    url: "http://183.220.144.58:8001/GAJKQ3D/tileset.json",
    luminanceAtZenith: 0.3,
    maximumScreenSpaceError: 20,
    highlight: { type: "click", color: "#00ffff" },
    popup: "all",
  });
  map.addLayer(tiles3dLayer);
  tiles3dLayer.flyTo({ radius: 2000, duration: 0.5 });
}

// function loadbox() {
//   let graphicLayer = map.getLayerById("boxlayer");
//   if (!graphicLayer) {
//     graphicLayer = new mars3d.layer.GraphicLayer({ id: "boxlayer" });
//     map.addLayer(graphicLayer);
//   }
//   const graphic = new mars3d.graphic.BoxEntity({
//     position: [106.840242, 30.503166, 50],
//     style: {
//       dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
//       color: "#ff0000",
//       opacity: 0.4,
//       clampToGround: true,
//     },
//     attr: { remark: "示例2" },
//   });
//   graphicLayer.addGraphic(graphic);
// }
onMounted(() => {
  initmap();
});
</script>
<style lang="scss" scoped>
#mapbox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // position: relative;
  // border: 1px solid red;
}
#mars3dContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // border: 1px solid yellow;
}
</style>
