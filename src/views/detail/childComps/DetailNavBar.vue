<template>
  <div>
    <nav-bar class="detail-nav">
      <template #left>
        <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template #center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="index"
            class="title-item"
            :class="{ active: index === currentIndex }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
      // console.log(index);
    },
    backClick(){
        this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
.detail-nav {
  background-color: #ffffff;
}
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
    margin-top: 10px;
}
</style>