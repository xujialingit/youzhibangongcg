export default {
  path: '/yusuan_detail',
  component: r =>  require.ensure([], () => r(require('./yusuan_detail.vue')), 'yusuan_detail'),
};
