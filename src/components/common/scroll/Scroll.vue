<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 默认情况下 BScroll 是不可以实时的监听滚动位置
// prode 侦测
// 1：非实时（屏幕滑动超过一定时间后）派发scroll 事件；
// 2：在屏幕滑动的过程中实时派发 scroll 事件；
// 3：不仅在屏幕滑动的过程中，而且在滚动动画运行过程中实时派发 scroll 事件。
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
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 2.0版本以上要加上observeDOM：true  才能滚动
        //   当插件被使用后，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法
        observeDOM: true,
        observeImage: true,
        click: true,
        probeType: this.probeType,
        // mouseWheel: true,

        //   触发上拉事件的阈值
        pullUpLoad: this.pullUpLoad,
      });

      // this.scroll.scrollTo(0, 0);
      // 2.监听滚动的位置
      if (this.probeType == 2 || this.probeType == 3) {
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);

          // console.log(position);
        });
      }
      // 监听滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
          // console.log("上拉加载更多");
        });
      }
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    finishPullUp() {
      // 结束上拉加载行为
      // 上拉加载动作结束,在finishPullUp() 方法调用前不会触发下一次的pullingUp事件
      this.scroll && this.scroll.finishPullUp();
      console.log("结束上拉加载行为");
    },
    refresh() {
      // 重新计算 BetterScroll ,当DOM结构发生变化的时候务必要调用确保滚动的效果正常
      // console.log("--------------");
      this.scroll && this.scroll.refresh();
      //   console.log("重新计算高度");
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped></style>
