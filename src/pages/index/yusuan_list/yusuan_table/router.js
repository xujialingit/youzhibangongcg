export default {
  path: '/yusuan_table',
  component: r =>  require.ensure([], () => r(require('./yusuan_table.vue')), 'yusuan_table'),
};
