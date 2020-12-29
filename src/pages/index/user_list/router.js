export default {
  path: '/user_list',
  component: r =>  require.ensure([], () => r(require('./user_list.vue')), 'user_list'),
};
