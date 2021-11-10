<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav">
      <template #center>
        <div>购物车({{ length }})</div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childComps/CartList";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    // cartLength() {
    //   return this.$store.state.cartList.length;
    // },
    // mapGetters 辅助函数仅仅是将store中的getter映射到局部计算属性中
    // 第一种
    // ...mapGetters(['cartLength'],['cartList']),
    // 第二种
    ...mapGetters({
      length: "cartLength",
      // list: "cartList"
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>