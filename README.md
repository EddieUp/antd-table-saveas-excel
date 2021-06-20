## 简介

[文档](https://eddieup.github.io/antd-table-saveas-excel/)

二次封装`better-xlsx`，基于`Antd Table`的表格导出插件

## 安装

```js
$ npm install antd-table-saveas-excel
```

## 关于 2.0 的版本更新内容

1. 优化了表头绘制逻辑，支持添加多个表头和表格
2. 新增了 api，提供更自由的布局（目前不支持横向添加表格）

## 从 1.0 升级到 2.0 的注意事项

除了新增的 api，其余只需注意：

1. 通过`addColumns`和`addDataSource`设置行高已被废弃，现在使用`setRowHeight`来设置
