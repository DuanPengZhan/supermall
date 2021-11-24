<template>
  <div v-if="Object.keys(rightTopImgList).length !== 0" class="right-img">
    <!-- 右侧上部图片 -->
    <div class="item" v-for="(item, index) in rightTopImgList" :key="index">
      <a :href="item.link">
        <img
          class="item-img"
          :src="item.image"
          @load="categoryImgLoad"
          alt=""
        />
      </a>
      <p class="item-title">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryRightImg",
  props: {
    rightTopImgList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // counter: 0,
      // imagesLength: 0,
    };
  },
  methods: {
    // 不可以使用  if   watch    会导致点击不同导航栏  tabOffsetTop不会重新计算
    categoryImgLoad() {
      this.$emit("categoryImgLoad");
      // if (++this.counter === this.imagesLength) {
      //   this.$emit("categoryImgLoad");
      // }
    },
  },
  // watch: {
  //   rightTopImgList() {
  //     this.imagesLength = this.rightTopImgList.length;
  //   },
  // },
};
</script>

<style scoped>
.right-img {
  height: 100%;
}

.item {
  display: inline-block;
  width: 32%;
  padding: 8px;
}

.item-img {
  width: 100%;
}

.item-title {
  margin-top: 5px;
  font-size: 16px;
  text-align: center;
}
</style>