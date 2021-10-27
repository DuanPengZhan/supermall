<template>
  <div>
    <div id="app">
      <main-tab-bar></main-tab-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import MainTabBar from '@/components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import url('./assets/css/base.css');
/* @import url('@/assets/css/base.css'); 会报错找不到模块 */
/* @import '@/assets/css/base.css';  vcli4不支持*/

</style>
