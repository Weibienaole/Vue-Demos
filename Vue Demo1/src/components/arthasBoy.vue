<template>
  <div>
    i am Arthas的children
    <div class="father">
      <div class="children">i am children</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.father {
  background: black;
  width: 400px;
  height: 400px;
  /*
  第一种，在父元素设置flex布局样式,父元素宽高未知的情况下可以进行居中
  display: flex;
  justify-content: center;
  align-items: center;
   */
  .children {
    background: green;
    width: 200px;
    height: 200px;

  /*
  利用定位，父元素position：relative，子元素绝对定位进行居中，也可以在父元素宽高未知的情况下居中
      position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   */

   /*
   同样利用定位，父元素相对定位，子元素绝对定位，然后设置上下左右为0，margin自动居中
       position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;

    */
  }
}
</style>
