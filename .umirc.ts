import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { path: '/snake', component: '@/pages/snake' },
  // ],
  fastRefresh: {},
  // devServer: {
  //   https: {
  //     key: './key.pem',
  //     cert: './cert.pem',
  //   },
  // },
})
