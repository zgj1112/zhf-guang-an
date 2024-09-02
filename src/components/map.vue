<template>
  <div id="mapbox">
    <div id="mars3dContainer"></div>
    <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      placement="left"
      :mask="false"
    >
      <a-checkbox
        v-model:checked="checkall"
        :indeterminate="indeterminate"
        @change="onCheckAllChange"
      >
        全部加载
      </a-checkbox>
      <a-checkbox-group
        v-model:value="checkedList"
        :options="urlarr1"
        style="display: grid"
      />
    </a-drawer>

    <div class="qiehuan" @click="open = true">模型列表</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
//引入cesium基础库
import * as mars3d from "mars3d";
import options from "./img/data-view-config.json";
let map: any = null;
// let changeindex:false;
const changeindex = ref(0);
const checkall = ref(false);
const checkedList = ref<string[]>([]);
const loading = ref(false);
const open = ref(false);
const indeterminate = ref(false);
let urlarr1: string[] = [
  "倾斜摄影",
  "广安北新建材有限公司",
  "广安诚信化工有限公司(一期)",
  "广安诚信化工有限责任公司二期",
  "广安诚信化工有限公司(三期)",
  "广安宏源",
  "广安经济开发区新桥能源化工园区污水处理厂",
  "广安久源",
  "广安利尔A区",
  "广安利尔C区",
  "广安利华化学有限公司",
  "广安绿源循环科技有限公司",
  "广安摩伽",
  "广安西部橡胶资源循环利用产业园",
  "华油天然气广安有限公司",
  "四川华辉杭萧钢构有限公司",
  "四川金谷环保科技有限公司",
  "四川吉兴新材料有限公司",
  "四川康惠源生物科技有限公司",
  "四川民喜生物制剂有限公司",
  "四川圣效",
  "四川沃肯",
  "四川沃野",
  "四川暄洋新材料科技有限公司",
  "四川中睿电气设备有限公司",
  "新桥输气未站",
  "先易达",
];
let urlarr2: { [key: string]: string } = {
  倾斜摄影: "http://183.220.144.58:8001/GAJKQ3D/tileset.json",
  广安北新建材有限公司:
    "http://183.220.144.58:8001/models/gabxjcyxgs_3dtiles/tileset.json",
  "广安诚信化工有限公司(一期)":
    "http://183.220.144.58:8001/models/gacxhgyxgsyq_3dtiles/tileset.json",
  "广安诚信化工有限公司(二期)":
    "http://183.220.144.58:8001/models/gacxhgyxzrgseq_3dtiles/tileset.json",

  "广安诚信化工有限公司(三期)":
    "http://183.220.144.58:8001/models/gacxhgyxgssq_3dtiles/tileset.json",

  广安宏源: "http://183.220.144.58:8001/models/gahyhgyxgs_3dtiles/tileset.json",

  广安经济开发区新桥能源化工园区污水处理厂:
    "http://183.220.144.58:8001/models/gajjkfqxqnyhgyqwsclc_3dtiles/tileset.json",

  广安久源:
    "http://183.220.144.58:8001/models/gajyxclyxgs_3dtiles/tileset.json",

  广安利尔A区: "http://183.220.144.58:8001/models/galeaq_3dtiles/tileset.json",

  广安利尔C区: "http://183.220.144.58:8001/models/galecq_3dtiles/tileset.json",

  广安利华化学有限公司:
    "http://183.220.144.58:8001/models/galhhxyxgs_3dtiles/tileset.json",

  广安绿源循环科技有限公司:
    "http://183.220.144.58:8001/models/galyxhkjyxgs_3dtiles/tileset.json",

  广安摩伽:
    "http://183.220.144.58:8001/models/gamjswkjyxgs_3dtiles/tileset.json",
  广安西部橡胶资源循环利用产业园:
    "http://183.220.144.58:8001/models/gaxbxjzyxhlycyy_3dtiles/tileset.json",

  华油天然气广安有限公司:
    "http://183.220.144.58:8001/models/hytrqgayxgs_3dtiles/tileset.json",

  四川华辉杭萧钢构有限公司:
    "http://183.220.144.58:8001/models/schhhxggyxgs_3dtiles/tileset.json",
  四川金谷环保科技有限公司:
    "http://183.220.144.58:8001/models/scjghbkjyxgs_3dtiles/tileset.json",
  四川吉兴新材料有限公司:
    "http://183.220.144.58:8001/models/scjxxclyxgs_3dtiles/tileset.json",

  四川康惠源生物科技有限公司:
    "http://183.220.144.58:8001/models/sckhyswkjyxgs_3dtiles/tileset.json",

  四川民喜生物制剂有限公司:
    "http://183.220.144.58:8001/models/scmxswzjyxgs_3dtiles/tileset.json",

  四川圣效:
    "http://183.220.144.58:8001/models/scsxkjgfyxgs_3dtiles/tileset.json",

  四川沃肯:
    "http://183.220.144.58:8001/models/scwkjxhgyxgs_3dtiles/tileset.json",

  四川沃野:
    "http://183.220.144.58:8001/models/scwyswkjyxgs_3dtiles/tileset.json",

  四川暄洋新材料科技有限公司:
    "http://183.220.144.58:8001/models/scxyxclkjyxgs_3dtiles/tileset.json",

  四川中睿电气设备有限公司:
    "http://183.220.144.58:8001/models/sczrdqsbyxgs_3dtiles/tileset.json",

  新桥输气未站: "http://183.220.144.58:8001/models/xqsqmz_3dtiles/tileset.json",
  先易达: "http://183.220.144.58:8001/models/xyd3d/tileset.json",
};

function initmap() {
  map = new mars3d.Map("mars3dContainer", options);
  map.flyToPoint([106.83652, 30.495902, 10], {
    radius: 10000,
    duration: 0.5,
    // pitch: -25,
  });
}

// 全选功能
const onCheckAllChange = (e: any) => {
  checkedList.value = e.target.checked ? urlarr1 : [];
  indeterminate.value = false;
};

watch(
  () => checkedList.value,
  (val) => {
    indeterminate.value = !!val.length && val.length < urlarr1.length;
    checkall.value = val.length === urlarr1.length;
    const unchecked = urlarr1.filter((key) => !checkedList.value.includes(key));
    //   不展示
    unchecked.forEach((item) => {
      let tiles3dLayer = getlayer(item, urlarr2[item]);
      tiles3dLayer.show = false;
    });
    // 展示
    checkedList.value.forEach((item) => {
      let tiles3dLayer = getlayer(item, urlarr2[item]);
      tiles3dLayer.show = true;
    });
  }
);

// 获取图层
function getlayer(name: string, url: string) {
  let tiles3dLayer = map.getLayerById(name);
  if (!tiles3dLayer) {
    tiles3dLayer = new mars3d.layer.TilesetLayer({
      // name: "工厂区域",
      id: name,
      url: url,
      luminanceAtZenith: 0.3,
      maximumScreenSpaceError: 20,
      show: false,
    });
    map.addLayer(tiles3dLayer);
  }
  return tiles3dLayer;
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
  height: 35px;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
  left: 50px;
  top: 50px;
  color: #fff;
  background-color: #1677ff;
  // background-color: aqua;
  border-radius: 2px;
}

// .bccbox {
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   //   justify-content: space-around;
//   width: 350px;
//   height: 800px;
//   overflow: auto;
//   text-align: center;
//   padding: 10px;
//   //   cursor: pointer;
//   left: 20px;
//   top: 20px;
//   //   color: #fff;
//   background-color: #fff;
//   //   background-color: aqua;
//   //   border-radius: 2px;
// }
</style>
