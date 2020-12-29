export default {
  path: '/fenxi_table',
  component: r =>  require.ensure([], () => r(require('./fenxi_table.vue')), 'fenxi_table'),
};
