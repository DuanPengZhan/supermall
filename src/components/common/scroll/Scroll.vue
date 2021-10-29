<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true, // 2.0版本以上要加上observeDOM：true  才能滚动
        click: true,
        probeType: 2,
        mouseWheel: true,
        // pullUpLoad: true,
      });

      this.scroll.scrollTo(0, 0);

      //   this.scroll.on("scroll", (position) => {
      //     console.log(position);
      //   });

      //   this.scroll.on("pullingUp", () => {
      //     console.log("上拉加载更多");
      //   });
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>