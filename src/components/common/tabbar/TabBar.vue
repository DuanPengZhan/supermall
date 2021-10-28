<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style  scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* box-shadow: 0 -0.1785rem 0.1785rem 0 #f4f4f4; */
  border-top: 1px solid #d9d9d9;
  /* overflow: hidden; */
  z-index: 1;
}
</style>