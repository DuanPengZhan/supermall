<template>
  <div class="shop-item">
    <div class="item-selector">
      <CheckButton
        :isChecked="itemInfo.checked"
        @click="checkClick"
      ></CheckButton>
    </div>

    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ itemInfo.price }}</div>
        <div class="item-price right">
          <span class="sub" @click="sub">-</span>
          <span class="count"> {{ itemInfo.count }}</span>
          <span class="add" @click="add">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
    sub() {
      if (this.itemInfo.count === 1) {
        this.itemInfo.count = 1
        this.$toast.show("最少购买一件哦",1000)
      } else {
        this.itemInfo.count--;
      }
    },
    add() {
      this.itemInfo.count++;
    },
  },
};
</script>

<style scoped>
.shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.info-bottom .item-price span {
  border: 1px solid #eee;
  padding: 7px 15px;
}

.info-bottom .item-price .sub {
  border-top-left-radius: 25%;
  border-bottom-left-radius: 25%;
}

.info-bottom .item-price .add {
  border-top-right-radius: 25%;
  border-bottom-right-radius: 25%;
}
</style>