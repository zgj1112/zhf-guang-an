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

let urlarr = [
  // "http://183.220.144.58:8001/GAJKQ3D/tileset.json",
  // "http://221.237.199.79:8091/hse/models/new3d/tileset.json",
  //   "https://demo.zhonghuifang.com/hse/models/new3d/tileset.json",
  //   "http://140.210.208.8:9999/hse/models/new3d/tileset.json",
  "http://183.220.144.58:8001/hy3d/tileset.json", //宏源
  "http://183.220.144.58:8001/jyxcl3d/tileset.json", //久源
  "http://183.220.144.58:8001/mojia3d/tileset.json", //摩伽
  "http://183.220.144.58:8001/sx3d/tileset.json", //圣效
  "http://183.220.144.58:8001/woken3d/tileset.json", //沃肯
  "http://183.220.144.58:8001/xyd3d/tileset.json", //先易达
];
function initmap() {
  map = new mars3d.Map("mars3dContainer", options);
  forfun();
  //   loadbox();
  map.flyToPoint([106.83652, 30.495902, 10], {
    radius: 10000,
    duration: 0.5,
    // pitch: -25,
  });
}

function forfun() {
  urlarr.forEach((item, index) => {
    loadmodel(item);
  });
}
function loadmodel(url: string) {
  //   console.log(222, process.env.BASE_URL);
  let tiles3dLayer = new mars3d.layer.TilesetLayer({
    // name: "工厂区域",
    url: url,
    luminanceAtZenith: 0.3,
    maximumScreenSpaceError: 20,
    // highlight: { type: "click", color: "#00ffff" },
    // popup: "all",
  });
  map.addLayer(tiles3dLayer);
  //   tiles3dLayermap.flyTo({ radius: 10000, duration: 0.5 });
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
