## 简介

二次封装`better-xlsx`，基于`Antd Table`的表格导出插件

## 安装

```js
$ npm install antd-table-saveas-excel
```

## 方法

### addSheet

添加工作表

- 工作表名称

```js
excel.addSheet('测试工作表');
```

### addColumns

添加表头

- [antd table columns](/3types#iexcelcolumn)
- 行高(可选，单位 CM)

```js
excel.addColumns(
  [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
  ],
  1,
);
```

### addDataSource

添加表格数据

- 数据
- [表格体配置(可选)](/3types#itbodyconfig)

```js
excel.addDataSource([
  {
    name: '张三',
    age: '18',
  },
  {
    title: '李四',
    age: '20',
  },
]);
```

### setTHeadStyle

设置表格头样式

- [样式](/3types#istyle)

```js
excel.setTHeadStyle({
  background: 'FF404040',
});
```

### setTBodyStyle

设置表格体样式

- [样式](/3types#istyle)

```js
excel.setTBodyStyle({
  background: 'FFFFFFFF',
});
```

### saveAs

下载保存

```js
excel.saveAs('测试.xlsx');
```
