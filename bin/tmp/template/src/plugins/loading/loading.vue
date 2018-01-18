<style lang="scss">
@import "../../assets/css/mix.scss";

#diyLoading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 1800;
  .loading-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1500;
  }
  .loading-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    z-index: 1400;
  }
  .loader-xbox, .loader-xbox:before, .loader-xbox:after {
    position: absolute;
    border: 3px solid transparent;
    border-top: 3px solid #41b883;
    border-radius: 50%;
    animation: rotate linear infinite;
    content: '';
  }
  .loader-xbox {
    position: relative;
    height: 100px;
    width: 100px;
    animation-duration: 1.05s;
  }
  .loader-xbox:before {
    height: 75px;
    width: 75px;
    top: 10px;
    left: 10px;
    border-top: 3px solid #f7484e;
    animation-duration: 10s;
  }
  .loader-xbox:after {
    height: 50px;
    width: 50px;
    top: 22px;
    left: 22px;
    border-top: 3px solid #f8b334;
    animation-duration: 4s;
  }
  @keyframes rotate {
    from {
      transform: rotateZ(360deg);
    }
    to {
      transform: rotateZ(0deg);
    }
  }
  .loading-text {
    text-align: center;
    color: #000;
    font-size: 28px;
    padding: 20px 0;
  }
}
</style>
<template>
  <div id="diyLoading" v-show="isShow" :class="[outClass]">
    <div class="loading-bg"></div>
    <div class="loading-inner">
      <div class="loader-xbox"></div>
      <div class="loading-text">{{text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    outClass: { // 外层需要添加的calss
      type: String,
      default: '',
    },
    text: { // 需要显示的文字
      type: String,
      default: '',
    },
  },
};
</script>
