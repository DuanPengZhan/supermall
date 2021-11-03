<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      class="tab-control"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      keepAlive="true"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl2"
        v-show="!isTabFixed"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- vcli4中   click加不加.native  组件点击事件都会发生  -->
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
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
import { debounce } from "@/common/utils/";

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
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
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
  mounted() {
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    refresh();

    // 获取tabControl的offsetTop
    // 所有组件都有一个属性$el:用于获取组件中的元素
    // console.log(this.$refs.TabControl.$el.offsetTop);
  },
  updated() {},
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 200);
    
    console.log(this.saveY);
    console.log("activated");
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY);
    console.log("deactivated");
  },
  unmounted() {
    console.log("Home页面销毁");
  },
  methods: {
    /*
    事件监听相关方法
    */
    tabClick(index) {
      // this.currentType = (index = 0 ) ? 'pop' : (index == 1) ? 'new' : 'sell';
      this.currentType = index == 0 ? "pop" : index == 1 ? "new" : "sell";
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop + 44, 1000);
      console.log(this.tabOffsetTop);

      console.log(index);
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      console.log("返回");
    },
    // 监听内容滚动距离
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000;
      // console.log(position);

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y + 44 > this.tabOffsetTop;
    },
    // 监听滚动内容
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 完成上拉加载更多
      this.$refs.scroll.finishPullUp();

      // this.$refs.scroll.refresh(); //可以不使用
      console.log("上拉加载更多");
    },

    // 判断轮播图加载完之后 测算offsetTop的高度
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.$refs.tabControl2.$el.offsetTop);
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
      const page = this.goods[type].page + 1; //获取第一页
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        res.data.list && this.goods[type].list.push(...res.data.list);
        // 第二个page+1是我们保存的数据，我们保存了多少个page,此时才更新我们的this.goods[type].page
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* position: relative; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

/* 第一种 */
.content {
  height: calc(100vh - 93px);
  overflow: hidden;
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

/* .tab-control {
  position: relative;
  z-index: 9;
} */
</style>
