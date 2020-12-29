export default {
  path: '/yusuan_list',
  component: r =>  require.ensure([], () => r(require('./yusuan_list.vue')), 'yusuan_list'),
};
