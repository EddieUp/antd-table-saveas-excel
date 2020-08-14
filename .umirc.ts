import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Table2Excel',
  description: '基于antd table的导出插件',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: '/docs-dist',
  hash: true,
  styles: [
    'https://asset-imeete.oss-cn-hangzhou.aliyuncs.com//50048.fvpkfnangd/an/202007/image/antd.min.css',
  ],
  base: '/antd-table-saveas-excel',
  publicPath: '/antd-table-saveas-excel/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
});
