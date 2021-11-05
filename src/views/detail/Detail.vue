<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--  @imageLoad="imageLoad"  不太需要 -->
      <detail-goods-info
        :detailInfo="detailInfo"
       
      ></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import { getDetail, Goods, Shop } from "@/network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 2.1获取数据
      const data = res.result;

      // 2.2获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.3获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.4获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.5获取商品详情信息
      this.detailInfo = data.detailInfo;
    });
  },
  methods: {
    // imageLoad() {
    //   console.log("DetailGoodsInfo  图片加载完成");
    // },
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
  background-color: #ffffff;
}

.content {
  height: calc(100vh - 93px);
  overflow: hidden;
}
</style>