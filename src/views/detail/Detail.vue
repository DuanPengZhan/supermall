<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <!-- 购物车添加演示  -->
      <!-- <ul>
        <li v-for="(item,index) in $store.state.cartList" :key="index">
          {{item}}
        </li>
      </ul> -->
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
    <to-cart @click="toCart"></to-cart>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <!-- <toast :message="msg"></toast> -->
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
import ToCart from "@/components/common/tocart/ToCart";
import { debounce } from "@/common/utils/";
import emitter from "@/common/eventbus.js";

import Scroll from "@/components/common/scroll/Scroll";
// import Toast from '@/components/common/toast/Toast'

import { mapActions } from "vuex";

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
    ToCart,
    // Toast
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
      console.log(res);
    });

    // 3.请求详情推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(res);
    });

    // 4.给getThemeTopy赋值  (对给this.titleTopY赋值的操作进行防抖)
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

    // 4.
  },
  updated() {},
  mounted() {
    // Vue3中  总线废除  改为使用 mitt  第三方库
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    emitter.on("imageLoad", () => {
      console.log("emitter---------------------");
      newRefresh();
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    swiperImageLoad() {
      console.log("swiperImageLoad  图片加载完成");
    },

    imageLoad() {
      // this.$refs.scroll.refresh();
      //图片加载完成  获取offsettop
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
          this.currentIndex &&
            (this.$refs.detailNavBar.currentIndex = this.currentIndex);
        }
      }
    },

    // 返回顶部按钮
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      // console.log("点击了");
    },

    // 跳转购物车页面
    toCart() {
      this.$router.push("/cart/");
    },

    // 添加购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车当中 (1.promise  2.mapActions)
      // this.$store.commit("addCart",product);
      // this.$store.dispatch("addCart", product).then(res=>{
      //   console.log(res);
      // })

      // mapActions写法
      this.addCart(product).then((res) => {
        // console.log(res);

        this.$toast.show(res, 1000);
      });
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