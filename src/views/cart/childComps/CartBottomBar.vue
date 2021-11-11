<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isSelectAll"
        @click="checkclick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="count">合计￥:{{ totalPrice }}</div>
    <div class="calc">去计算：{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    //   获取到cartList
    ...mapGetters(["cartList"]),

    totalPrice() {
      //   先过滤  再汇总
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0);
    },

    // 选中商品的数量
    checkLength() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },

    isSelectAll() {
      // console.log("this.isSelectAll----------"+this.isSelectAll);
      //  !0 = true   0 = false
      // true  全选    false  不全选
      if (this.cartList.length === 0) return false;
      // 1.使用filter()  检测数值元素，并返回符合条件所有元素的数组。
      // return !(this.cartList.filter(item => !item.checked).length);

      // 2.find  some  都可以   every 不行
      // 如果找到数据则返回对象 对象取反返回false 不全选  没找到数据返回undefined undefined取反返回true  全选
      return !this.cartList.some((item) => !item.checked);

      // 3.普通遍历
      // for (const item of this.cartList) {
      //   if (!item.checked) {
      //     return false;
      //   }
      // }
      // return true;
    },
  },
  methods: {
    checkclick() {
      // console.log(this.isSelectAll);
      // forEach() 数组每个元素都执行一次回调函数
      if (this.isSelectAll) { // 全部选中时  this.isSelectAll为true   点击后则变为false  所以取反
        // console.log("this.isSelectAll----------" + this.isSelectAll);
        return this.cartList.forEach((item) => (item.checked = false));
      } else { //部分 或全部不选中
        // console.log("this.isSelectAll+++++++++++" + this.isSelectAll);
        return this.cartList.forEach((item) => (item.checked = true));
      }

      // 有bug
      //   this.cartList.forEach((item) => item.checked === !this.isSelectAll);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  background-color: #dbe5ec;
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.check-content {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-left: 10px;
  width: 60px;
}
.count {
  color: #ff5777;
  padding-left: 50px;
  flex: 1;
  font-size: 13px;
}
.calc {
  width: 90px;
  color: white;
  text-align: center;
  background-color: #ff8198;
  font-size: 14px;
}
</style>