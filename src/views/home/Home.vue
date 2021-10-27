<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'


import { getHomeMultidata } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata()
      .then((res) => {
        // this.result = res
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}

</style>
