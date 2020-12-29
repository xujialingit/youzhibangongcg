export default {
  path: '/shenpi_detail',
  component: r =>  require.ensure([], () => r(require('./shenpi_detail.vue')), 'shenpi_detail'),
};
