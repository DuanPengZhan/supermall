<template>
  <div class="to-cart">
    <img src="@/assets/img/detail/cart.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "ToCart",
};
</script>

<style scoped>
.to-cart {
  position: fixed;
  right: 8px;
  bottom: 100px;
  z-index: 100;
}
.to-cart img {
  width: 43px;
  height: 43px;
}
</style>