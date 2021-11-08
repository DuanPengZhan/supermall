<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper
        :topImages="topImages"
        @swiperImageLoad="swiperImageLoad"
      ></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--  @imageLoad="imageLoad"  不太需要 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/common/backTop/BackTop";
import { debounce } from "@/common/utils/";

import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      data: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      isShowBackTop: false,

      getThemeTopy: null,
      titleTopY: [],
      currentIndex: 0,

      paramOffsetTop: 0,
      commentOffsetTop: 0,
      recommendOffsetTop: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 2.1获取数据
      this.data = res.result;

      // 2.2获取顶部的图片轮播数据
      this.topImages = this.data.itemInfo.topImages;

      // 2.3获取商品信息
      this.goods = new Goods(
        this.data.itemInfo,
        this.data.columns,
        this.data.shopInfo.services
      );

      // 2.4获取店铺信息
      this.shop = new Shop(this.data.shopInfo);

      // 2.5获取商品详情信息
      this.detailInfo = this.data.detailInfo;

      // 2.6获取商品参数信息
      this.paramInfo = new GoodsParam(
        this.data.itemParams.info,
        this.data.itemParams.rule
      );

      // 2.7获取商品评论信息
      if (this.data.rate.cRate !== 0) {
        this.commentInfo = this.data.rate.list[0];
        // console.log(this.commentInfo);
      }
    });

    // 3.请求详情推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      console.log(res);
    });

    this.getThemeTopy = debounce(() => {
      this.$nextTick(() => {
        // 获取不同组件的offsetTop
        // -44 是因为detailNavBar top  44px
        this.titleTopY = [];
        this.titleTopY.push(0);
        this.titleTopY.push(this.$refs.params.$el.offsetTop - 44);
        this.titleTopY.push(
          this.$refs.comment.$el.offsetTop - 44 ||
            this.$refs.recommends.$el.offsetTop - 44
        );
        this.titleTopY.push(this.$refs.recommends.$el.offsetTop - 44);
        this.titleTopY.push(Number.MAX_VALUE);
        console.log(this.titleTopY);
      });
    }, 100);
  },
  updated() {},
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    newRefresh();
  },
  methods: {
    swiperImageLoad() {
      console.log("swiperImageLoad  图片加载完成");
    },

    imageLoad() {
      this.$refs.scroll.refresh();
      //图片加载获取offsettop
      this.getThemeTopy();
    },

    // 通过index 跳转到对应index的内容
    // 点击导航栏跳转页面
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.titleTopY[index], 100);
    },

    // 监听内容滚动
    // 滚动详情页与顶部导航栏的对应
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000;
      // console.log(position.y);
      const positionY = -position.y;
      let length = this.titleTopY.length;

      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.titleTopY[i] &&
          positionY < this.titleTopY[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.detailNavBar.currentIndex = this.currentIndex;
        }
      }
    },

    // 返回顶部按钮
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      // console.log("点击了");
    },
  },
  updated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
}
.detail-nav {
  position: relative;
  background-color: red;
}

.content {
  /* 44px  为detailNavBar高度    49px  为detailBottomBar高度 */
  /* width: calc(100% - 30px - 10%);
     height: calc(100% - 20px - 12%);
     padding: 20px 10% 12% 30px;  上 右 下 左 
  */
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>