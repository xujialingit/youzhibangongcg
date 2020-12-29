export default {
  path: '/order_list',
  component: r =>  require.ensure([], () => r(require('./order_list.vue')), 'order_list'),
};
