<template>
  <div class="category" ref="category">
    <nav-bar class="category-nav">
      <template #center>
        <div>分类</div>
      </template>
    </nav-bar>

    <category-left-nav
      :leftNavList="leftNavList"
      @itemCLick="itemCLick"
    ></category-left-nav>

    <div class="right">
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
        class="tab-control1"
      ></tab-control>
      <scroll
        class="content"
        ref="scroll"
        :probeType="3"
        @scroll="contentScroll"
      >
        <!-- 右侧上部图片 -->
        <category-right-img
          :rightTopImgList="rightTopImgList"
          @categoryImgLoad="categoryImgLoad"
        ></category-right-img>
        <!-- 右侧下半部商品列表 -->
        <tab-control
          :titles="titles"
          @tabClick="tabClick"
          ref="tabControl2"
          v-show="!isTabFixed"
        ></tab-control>
        <goods-list :goods="shopList"></goods-list>
      </scroll>
    </div>

    <!-- vcli4中   click加不加.native  组件点击事件都会发生  -->
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CategoryLeftNav from "./childComps/CategoryLeftNav.vue";
import CategoryRightImg from "./childComps/CategoryRightImg.vue";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/common/backTop/BackTop";



import Scroll from "@/components/common/scroll/Scroll";

import {
  getCategoryLeftNav,
  getCategoryRightTopImg,
  getCategoryRightBottomShopList,
} from "@/network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    CategoryLeftNav,
    CategoryRightImg,
    TabControl,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      leftNavList: [],
      rightTopImgList: [],
      maitKey: "3627",
      miniWallkey: "10062603",
      titles: ["流行", "新款", "精选"],
      currentType: "pop",
      shopList: [],
      tabOffsetTop: 0,
      isTabFixed: false,
      isShowBackTop: false,
    };
  },
  computed: {},
  created() {
    this.getCategoryLeftNav();
    this.getCategoryRightTopImg(this.maitKey);
    this.getCategoryRightBottomShopList(this.miniWallkey, "pop");
    this.getCategoryRightBottomShopList(this.miniWallkey, "new");
    this.getCategoryRightBottomShopList(this.miniWallkey, "sell");
  },
  updated() {
    this.$refs.scroll.refresh();
  },
  // 组件创建完后调用
  mounted() {},
  methods: {
    itemCLick(index) {
      this.maitKey = this.leftNavList[index].maitKey;
      this.miniWallkey = this.leftNavList[index].miniWallkey;
      // console.log(index + " " + this.maitKey);
      // this.getCategoryRightTopImg(this.maitKey);
      this.$refs.scroll.scrollTo(0, 0, 500);
      // 点击左边导航栏  右边tabControl的  currentIndex  初始化为0
      this.$refs.tabControl1.currentIndex = 0;
      this.$refs.tabControl2.currentIndex = 0;
      // currentIndex  初始化为0 时请求对应的数据   让它及时刷新
      this.getCategoryRightBottomShopList(this.miniWallkey, this.currentType);
    },

    tabClick(index) {
      this.currentType = index == 0 ? "pop" : index == 1 ? "new" : "sell";
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop + 44, 1000);
      // console.log(this.miniWallkey + " ------------" + this.currentType);
      this.getCategoryRightBottomShopList(this.miniWallkey, this.currentType);
      // console.log("TabControl-----" + index);
    },

    // 右侧上半部图片加载完成
    categoryImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },

    // 监听内容滚动距离
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000;
      // 决定tabControl是否吸顶(position: fixed)
      // console.log(position.y);
      this.isTabFixed = -position.y > this.tabOffsetTop ? true : false;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      console.log("返回");
    },

    // 请求数据
    // 请求获取分类页面数据  左侧导航数据
    getCategoryLeftNav() {
      getCategoryLeftNav().then((res) => {
        // console.log(res);
        this.leftNavList = res.data.category.list;
        // console.log(this.leftNavList);
      });
    },

    // 获取分类页面  右侧上半部图片
    getCategoryRightTopImg(maitKey) {
      // this.leftNavList[index].maitKey = maitKey
      getCategoryRightTopImg(maitKey).then((res) => {
        // console.log(maitKey);
        // console.log(res);
        this.rightTopImgList = res.data.list;
        // console.log(this.rightTopImgList);
        res;
      });
    },

    // 获取分类页面  右侧下半部商品列表
    getCategoryRightBottomShopList(miniWallkey, type) {
      getCategoryRightBottomShopList(miniWallkey, type).then((res) => {
        this.shopList = res;
        // console.log(this.shopList);
      });
    },
  },
  //回调中移除监听
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}

.right {
  width: 75%;
  height: calc(100vh - 44px - 46px);
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
}
.tab-control1 {
  z-index: 999;
}
.content {
  height: 100%;
  overflow: hidden;
}

.is_fixed {
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>