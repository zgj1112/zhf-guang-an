<template>
  <div id="indexbox">
    <mapbox></mapbox>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import mapbox from "./map.vue";
//引入cesium基础库

function getdata() {}
onMounted(() => {
  getdata();
});
</script>
<style lang="scss" scoped>
#indexbox {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
