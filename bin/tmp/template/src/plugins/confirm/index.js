import ConfirmCom from './confirm.vue';

let instance;

export default {
  install(Vue) {
    const Confirm = Vue.extend(ConfirmCom);

    const ConfirmObj = {
      show(options) {
        var prop;
        if (!instance) {
          instance = new Confirm({
            el: document.createElement('div'),
          });
        }
        if (instance.isShow) return;
        instance.isShow = true;
        /* eslint-disable no-restricted-syntax */
        /* eslint-disable no-prototype-builtins */
        for (prop in options) {
          if (options.hasOwnProperty(prop)) {
            instance[prop] = options[prop];
          }
        }
        instance.hideCallback = function callback(isShow) {
          instance.isShow = isShow;
        };
        document.body.appendChild(instance.$el);

        Vue.nextTick(() => {
          instance.isShow = true;
        });
      },
      close() {
        if (instance) {
          instance.isShow = false;
        }
      },
    };
    Vue.$confirm = ConfirmObj;
    Object.defineProperty(Vue.prototype, '$confirm', {
      get: function get() {
        return ConfirmObj;
      },
    });
  },
};

