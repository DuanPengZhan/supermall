<template>
  <div class="left-nav">
    <scroll class="content">
      <div class="left-nav-list">
        <div
          class="left-nav-list-item"
          v-for="(item, index) in leftNavList"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="itemCLick(index)"
        >
          <p>{{ item.title }}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "CategoryLeftNav",
  components: {
    Scroll,
  },
  props: {
    leftNavList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemCLick(index) {
      this.currentIndex = index;
      this.$emit("itemCLick", index);
      //   console.log(index);
    },
  },
};
</script>

<style scoped>
.left-nav {
  height: calc(100vh - 44px - 46px);
  background-color: #f6f6f6;
  width: 25%;
}
.content {
  height: 100%;
  overflow: hidden;
}

.left-nav-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.left-nav-list-item {
  width: 100%;
  text-align: center;
  color: rgba(100, 100, 100);
  display: inline-block;
  line-height: 14px; /* line-height是用来控制border的,其父亲的line-height用来控制整体的行高，自己的用来控制元素的行高 */
  border-left: 3px solid #f6f6f6;
}

.left-nav-list-item p {
  height: 3rem;
  line-height: 3rem;
}

.active {
  background-color: white;
  color: var(--color-high-text);
  font-weight: 600;
  border-left: 0.2rem solid var(--color-high-text);
}
</style>