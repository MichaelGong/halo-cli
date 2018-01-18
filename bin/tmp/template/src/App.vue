<template>
  <div class="app">
      <transition :name="'biu-pop-' + (isBack ? 'out' : 'in')">
        <router-view class="router-view"></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isBack: false,
    };
  },
  watch: {
    '$route'() {
      this.isBack = this.$router.isBack;
    },
  },
};
</script>

<style lang="scss">
/**
* vue-router transition
*/
.router-view {
  width: 100%;
  animation-duration: .5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.biu-pop-out-enter-active,
.biu-pop-out-leave-active,
.biu-pop-in-enter-active,
.biu-pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.biu-pop-out-enter-active {
  animation-name: popInLeft;
}
.biu-pop-out-leave-active {
  animation-name: popOutRight;
}
.biu-pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}
.biu-pop-in-leave-active {
  animation-name: popOutLeft;
}
@keyframes popInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
