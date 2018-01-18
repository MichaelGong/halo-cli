// 首页
const index = () => import(/* webpackChunkName: "index" */ '@/pages/index');
// detail页
const detail = () => import(/* webpackChunkName: "index" */ '@/pages/detail');

// 路由配置
export default [{
  path: '/',
  name: 'index',
  meta: {
    title: '首页',
  },
  component: index,
}, {
  path: '/detail',
  name: 'detail',
  meta: {
    title: '详情页',
  },
  component: detail,
}, {
  path: '*', // 其他页面
  redirect: '/',
}];
