<template>
  <div id="mapbox">
    <div id="mars3dContainer"></div>
    <a-button
      class="qiehuan"
      type="primary"
      :loading="loading"
      @click="changefun()"
    >
      {{ changeindex ? "三维建模" : "倾斜摄影" }}</a-button
    >
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
//引入cesium基础库
import * as mars3d from "mars3d";
import options from "./img/data-view-config.json";
let map: any = null;
// let changeindex:false;
const changeindex = ref(false);
const loading = ref(false);
let urlarr1 = ["http://183.220.144.58:8001/GAJKQ3D/tileset.json"];
let urlarr2 = [
  "http://183.220.144.58:8001/models/gabxjcyxgs_3dtiles/tileset.json", //广安北新建材有限公司
  "http://183.220.144.58:8001/models/gacxhgyxgsyq_3dtiles/tileset.json", //广安诚信化工有限公司(一期)
  "http://183.220.144.58:8001/models/gacxhgyxzrgseq_3dtiles/tileset.json", //广安诚信化工有限责任公司二期
  "http://183.220.144.58:8001/models/gacxhgyxgssq_3dtiles/tileset.json", //广安诚信化工有限公司(三期)
  "http://183.220.144.58:8001/models/gahyhgyxgs_3dtiles/tileset.json", //广安宏源
  "http://183.220.144.58:8001/models/gajjkfqxqnyhgyqwsclc_3dtiles/tileset.json", //广安经济开发区新桥能源化工园区污水处理厂
  "http://183.220.144.58:8001/models/gajyxclyxgs_3dtiles/tileset.json", //广安久源
  "http://183.220.144.58:8001/models/galeaq_3dtiles/tileset.json", //广安利尔A区
  "http://183.220.144.58:8001/models/galecq_3dtiles/tileset.json", //广安利尔C区
  "http://183.220.144.58:8001/models/galhhxyxgs_3dtiles/tileset.json", //广安利华化学有限公司
  "http://183.220.144.58:8001/models/galyxhkjyxgs_3dtiles/tileset.json", //广安绿源循环科技有限公司
  "http://183.220.144.58:8001/models/gamjswkjyxgs_3dtiles/tileset.json", //广安摩伽
  "http://183.220.144.58:8001/models/gaxbxjzyxhlycyy_3dtiles/tileset.json", //广安西部橡胶资源循环利用产业园
  "http://183.220.144.58:8001/models/hytrqgayxgs_3dtiles/tileset.json", //华油天然气广安有限公司
  "http://183.220.144.58:8001/models/schhhxggyxgs_3dtiles/tileset.json", //四川华辉杭萧钢构有限公司
  "http://183.220.144.58:8001/models/scjghbkjyxgs_3dtiles/tileset.json", //四川金谷环保科技有限公司
  "http://183.220.144.58:8001/models/scjxxclyxgs_3dtiles/tileset.json", //四川吉兴新材料有限公司
  "http://183.220.144.58:8001/models/sckhyswkjyxgs_3dtiles/tileset.json", //四川康惠源生物科技有限公司
  "http://183.220.144.58:8001/models/scmxswzjyxgs_3dtiles/tileset.json", //四川民喜生物制剂有限公司
  "http://183.220.144.58:8001/models/scsxkjgfyxgs_3dtiles/tileset.json", //四川圣效
  "http://183.220.144.58:8001/models/scwkjxhgyxgs_3dtiles/tileset.json", //四川沃肯
  "http://183.220.144.58:8001/models/scwyswkjyxgs_3dtiles/tileset.json", //四川沃野
  "http://183.220.144.58:8001/models/scxyxclkjyxgs_3dtiles/tileset.json", //四川暄洋新材料科技有限公司
  "http://183.220.144.58:8001/models/sczrdqsbyxgs_3dtiles/tileset.json", //四川中睿电气设备有限公司
  "http://183.220.144.58:8001/models/xqsqmz_3dtiles/tileset.json", //新桥输气未站
  "http://183.220.144.58:8001/models/xyd3d/tileset.json", //先易达
  //   "http://183.220.144.58:8001/models/mojia3d/tileset.json", //摩伽
  //   "http://183.220.144.58:8001/models/jyxcl3d/tileset.json", //久源
  //   "http://183.220.144.58:8001/models/hy3d/tileset.json", //宏源
  //   "http://183.220.144.58:8001/models/sx3d/tileset.json", //圣效
  //   "http://183.220.144.58:8001/models/woken3d/tileset.json", //沃肯
];

function initmap() {
  map = new mars3d.Map("mars3dContainer", options);
  forfun(urlarr2, true);
  map.flyToPoint([106.83652, 30.495902, 10], {
    radius: 10000,
    duration: 0.5,
    // pitch: -25,
  });
}

function forfun(forarr: string[], isshow: boolean) {
  forarr.forEach((item, index) => {
    console.log(index);
    let tiles3dLayer = getlayer(item);
    tiles3dLayer.show = isshow;
    // if (!isshow) {
    //   tiles3dLayer.remove();
    // }
  });
}

// 获取图层
function getlayer(url: string) {
  let tiles3dLayer = map.getLayerById(url);
  if (!tiles3dLayer) {
    tiles3dLayer = new mars3d.layer.TilesetLayer({
      // name: "工厂区域",
      id: url,
      url: url,
      luminanceAtZenith: 0.3,
      maximumScreenSpaceError: 20,
      //   show: true,
      // highlight: { type: "click", color: "#00ffff" },
      // popup: "all",
    });

    map.addLayer(tiles3dLayer);
  }
  return tiles3dLayer;
}

function changefun() {
  loading.value = true;
  if (!changeindex.value) {
    forfun(urlarr1, true);
    forfun(urlarr2, false);
  } else {
    forfun(urlarr1, false);
    forfun(urlarr2, true);
  }
  setTimeout(() => {
    loading.value = false;
    changeindex.value = !changeindex.value;
  }, 3000);
}

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
.qiehuan {
  position: absolute;
  width: 120px;
  //   height: 35px;
  //   line-height: 35px;
  //   text-align: center;
  cursor: pointer;
  left: 50px;
  top: 50px;
  color: #fff;
  background-color: #1677ff;
  // background-color: aqua;
  border-radius: 2px;
}
</style>
