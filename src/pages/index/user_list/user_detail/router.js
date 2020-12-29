export default {
  path: '/user_detail',
  component: r =>  require.ensure([], () => r(require('./user_detail.vue')), 'user_detail'),
};
