export default {
  path: '/baobiao',
  component: r =>  require.ensure([], () => r(require('./baobiao.vue')), 'baobiao'),
};
