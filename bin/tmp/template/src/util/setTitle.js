/**
 * 设置title
 * @param {string} title文字
 */
export default function setTitle(title) {
  document.title = title;
  // 解决document.title 在 ios 下不生效bug方案 ios内生效
  const mobile = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(mobile)) {
    const iframe = document.createElement('iframe');
    const iframeHandler = function() {
      setTimeout(() => {
        iframe.removeEventListener('load', iframeHandler);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.style.cssText = 'display: none; width: 0; height: 0;position:fixed;';
    iframe.addEventListener('load', iframeHandler);
    document.body.appendChild(iframe);
  }
}
