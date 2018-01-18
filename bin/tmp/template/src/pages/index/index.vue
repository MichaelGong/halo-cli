<template>
<div class="index">
  <HelloWorld></HelloWorld>
  <h1 v-color>Hello World! {{name}}</h1>
  <div @click="showConfirm">Show Confirm</div>
  <div @click="showLoading">Show Loading</div>
  <input type="text" @input="inputHandler" placeholder="只能输入数字">
  <router-link to="detail" tag="div">去详情页</router-link>
</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import HelloWorld from '@/components/HelloWorld';
import types from '@/store/modules/index/mutation-types';
import mixins from '@/mixins';

export default {
  name: 'index',
  components: {
    HelloWorld,
  },
  mixins: [mixins],
  computed: {
    ...mapGetters('index', [
      'name',
    ]),
  },
  methods: {
    ...mapActions('index', [
      'setName',
    ]),
    ...mapMutations('index', [
      types.SET_NAME,
    ]),
    showConfirm() {
      this.$confirm.show({
        title: '啊哈哈', // 弹出框title，不传默认没有title
        content: '<div style="color:red">呵呵呵</div>', // 弹出框需要展示的文字内容，支持html和 字符串
        contentClass: 'cc', // content需要添加class，默认空
        cancelText: '你猜', // 取消按钮的文字,默认：取消
        cancelClass: 'cancelClass', // 取消按钮的class，默认空
        cancelFunc: function() { // 取消按钮的回调，可不传
          alert('取消回调');
        },
        confirmText: '你再猜', // 确定按钮的文字，默认：确定，默认空
        confirmClass: 'confirmClass', // 确定按钮需要添加的class，默认空
        confirmFunc: function() { // 确定按钮的回调
          alert('确认回调');
        },
        singleBtn: false, // 默认false（展示两个按钮），是否只展示一个按钮，如果此值为true，只展示一个按钮，该按钮对应确定按钮指定的功能
      });
    },
    showLoading() {
      this.$loading.show('2222');
      setTimeout(() => {
        this.$loading.close();
      }, 2000);
    },
    inputHandler(event) {
      event.target.value = this.onlyNumber(event.target.value);
    },
  },
  created() {
    setTimeout(() => {
      this[types.SET_NAME]({ name: 'index name' });
      setTimeout(() => {
        this.setName({ name: 'index name2' });
      });
    }, 2000);
  },
};
</script>
<style lang="scss" scoped>
.index {
  font-size: 32px;
  padding: 10px;
}
input {
  border: 1px solid #00ff00;
}
</style>

