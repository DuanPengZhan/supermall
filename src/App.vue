<template>
  <div>
    <div id="app">
      <router-view v-slot="{ Component }">
        <keep-alive include="Home,Cart,Category,Profile">
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path"></component>
        </keep-alive>
      </router-view>
      <!-- <router-view></router-view> -->
      <main-tab-bar v-if="$route.meta.footShow"></main-tab-bar>
    </div>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url("./assets/css/base.css");
/* @import url('@/assets/css/base.css'); 会报错找不到模块 */
/* @import '@/assets/css/base.css';  vcli4不支持*/
</style>
