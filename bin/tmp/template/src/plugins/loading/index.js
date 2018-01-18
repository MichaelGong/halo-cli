import LoadingCom from './loading.vue';

let instance;

function toggleFilterToApp(isAdd) {
  let dom = document.getElementById('app');
  if (!dom) return;
  if (isAdd) {
    dom.style.cssText += 'filter:blur(1.1px);-webkit-filter:blur(1.1px);';
  } else {
    dom.style.cssText += 'filter:blur(0);-webkit-filter:blur(0);';
  }
}
function toString(param) {
  return Object.prototype.toString.call(param);
}

export default {
  install(Vue) {
    const Loading = Vue.extend(LoadingCom);

    const LoadingObj = {
      /**
       * 显示loading
       * @param {*} params 当该参数为字符串时，表示loading要显示的文字，
       *            当为对象时{text:'要显示的文字', outClass:'最外层需要添加的class名字'}
       */
      show(params) {
        if (!instance) {
          instance = new Loading({
            el: document.createElement('div'),
          });
        }
        instance.isShow = true;
        if (toString(params) === '[object String]' || params === undefined) {
          instance.text = params || '';
        }
        if (toString(params) === '[object Object]') {
          instance.text = params.text;
          instance.outClass = params.outClass;
        }
        if (!document.getElementById(instance.$el.id)) {
          document.body.appendChild(instance.$el);
        }
        Vue.nextTick(() => {
          instance.isShow = true;
          toggleFilterToApp(true);
        });
      },
      close() {
        if (instance) {
          instance.isShow = false;
          toggleFilterToApp(false);
        }
      },
    };
    Vue.$loading = LoadingObj;
    Object.defineProperty(Vue.prototype, '$loading', {
      get: function get() {
        return LoadingObj;
      },
    });
  },
};
