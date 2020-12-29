export default {
  path: '/login',
  component: r =>  require.ensure([], () => r(require('./login.vue')), 'login'),
};
