export default {
  path: '/baobiao2',
  component: r =>  require.ensure([], () => r(require('./baobiao2.vue')), 'baobiao2'),
};
