<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <scroll class="content" ref="scroll">
      
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="titles"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
      
    </scroll>

    <!-- vcli4中   click加不加.native  组件点击事件都会发生  -->
      <back-top @click="backClick"></back-top>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/common/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /*
    事件监听相关方法
    */
    tabClick(index) {
      // this.currentType = (index = 0 ) ? 'pop' : (index == 1) ? 'new' : 'sell';
      this.currentType = index == 0 ? "pop" : index == 1 ? "new" : "sell";
      console.log(index);
    },

    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
      console.log("返回");
    },

    /*
    网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // type是变量  所以需要使用[]获取
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        // 第二个page+1是我们保存的数据，我们保存了多少个page,此时才更新我们的this.goods[type].page
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

/* 第一种 */
.content{
  height: calc(100vh - 93px);
  /* overflow: hidden;  */
}
/* 第二种 */
/* .content{
  overflow: hidden; 

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} */

.tab-control {
  position: sticky;
  top: 44px;
  background-color: #ffffff;
  z-index: 9;
}
</style>
