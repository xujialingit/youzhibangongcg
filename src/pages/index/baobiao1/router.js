export default {
  path: '/baobiao1',
  component: r =>  require.ensure([], () => r(require('./baobiao1.vue')), 'baobiao1'),
};
