<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ showDate(commentInfo.created) }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
    </div>

    <div class="info-imgs">
      <img
        :src="item"
        v-for="(item, index) in commentInfo.images"
        :key="index"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils/";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 第一种方法
    showDate(num) {
    /**parseInt() 函数可解析一个字符串，并返回一个整数。

        js中时间操作单位是毫秒。

        toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。

        replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

        replace(/:\d{1,2}$/,' ')验证替换以：开始有一位或二位数字的结束字符串，就是秒；替换为空 
    */
      return new Date(parseInt(num) * 1000).toLocaleString().replace(/:\d{1,2}$/, " ");
    },
    // 第二种方法
    // showDate(num) {
    //   // 1.将时间戳转换成Date对象
    //   const date = new Date(num * 1000);

    //   // 2.将date进行格式化
    //   //   return formatDate(date, "yyyy/MM/dd hh:mm:ss");
    //   return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    // },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header-title {
  float: left;
  font-size: 15px;
}

.header-more {
  float: right;
  margin-right: 10px;
  font-size: 13px;
}

.info-user {
  padding: 10px 0 5px;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info-other .date {
  margin-right: 8px;
}

.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>