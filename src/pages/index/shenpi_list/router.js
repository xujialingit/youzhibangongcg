export default {
  path: '/shenpi_list',
  component: r =>  require.ensure([], () => r(require('./shenpi_list.vue')), 'shenpi_list'),
};
