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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        //   this._initScroll();
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          // 2.0版本以上要加上observeDOM：true  才能滚动
          //   当插件被使用后，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法
          observeDOM: true,
          observeImage: true,
          click: true,
          probeType: this.probeType,
          mouseWheel: true,

          //   触发上拉事件的阈值
          pullUpLoad: this.pullUpLoad,
        });

        // this.scroll.scrollTo(0, 0);
        // 2.监听滚动的位置
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);

          // console.log(position);
        });

        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
          // console.log("上拉加载更多");
        });
      }, 500);
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll  && this.scroll.scrollTo(x, y, time);
    },
 
    finishPullUp() {
      // 结束上拉加载行为
      // 上拉加载动作结束,在finishPullUp() 方法调用前不会触发下一次的pullingUp事件
      this.scroll.finishPullUp();
      //   console.log("结束上拉加载行为");
    },
    refresh() {
      // 重新计算 BetterScroll ,当DOM结构发生变化的时候务必要调用确保滚动的效果正常
      this.scroll  && this.scroll.refresh();
      //   console.log("重新计算高度");
    },
  },
};
</script>

<style scoped></style>
