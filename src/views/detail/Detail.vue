<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @tabClick="tabClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper
        :topImages="topImages"
        @swiperImageLoad="swiperImageLoad"
      ></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--  @imageLoad="imageLoad"  不太需要 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
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
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/common/backTop/BackTop";

import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
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
      paramOffsetTop: 0,
      commentOffsetTop: 0,
      recommendOffsetTop: 0,
    };
  },
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
  },
  methods: {

    swiperImageLoad() {
      console.log("swiperImageLoad  图片加载完成");
    },

    imageLoad() {
      this.paramOffsetTop = this.$refs.param.$el.offsetTop;
      this.commentOffsetTop = this.$refs.comment.$el.offsetTop;
      this.recommendOffsetTop = this.$refs.recommend.$el.offsetTop;
      console.log(this.paramOffsetTop);
      console.log(this.commentOffsetTop);
      console.log(this.recommendOffsetTop);
      console.log("DetailGoodsInfo  图片加载完成");
    },

    // 获取
    tabClick(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0, 500);
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, -this.paramOffsetTop + 44, 500);
          break;
        case 2:
          this.$refs.scroll.scrollTo(0, -this.commentOffsetTop + 44, 500);
          break;
        case 3:
          this.$refs.scroll.scrollTo(0, -this.recommendOffsetTop + 44, 500);
          break;
        default:
          break;
      }

      console.log(index);
    },

    // 监听内容滚动
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000;
      // console.log(position.y);
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
  height: calc(100vh - 93px);
  overflow: hidden;
}
</style>