## API

### addSheet

添加工作表

- 工作表名称

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.addSheet('测试工作表');
```

### addColumns

添加表头

- 集成`antd table columns`的属性，并进行 [扩展](/3types#iexcelcolumn)
- 行高(可选，单位 CM)

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

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
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

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
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.setTHeadStyle({
  background: 'FF404040',
});
```

### setTBodyStyle

设置表格体样式

- [样式](/3types#istyle)

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.setTBodyStyle({
  background: 'FFFFFFFF',
});
```

### saveAs

下载保存

| 参数说明 | 类型    | 默认值 |
| -------- | ------- | ------ |
| 名称     | string  | --     |
| 保存类型 | 'blob'  | 'blob' |
| 是否压缩 | boolean | true   |

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.saveAs('测试.xlsx', 'blob', true);
```

### 完整示例

```tsx
import React from 'react';
import { Table, Button } from 'antd';
import { Excel } from 'antd-table-saveas-excel';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    date: '1999-10-01',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    date: '1990-10-07',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '出生',
    dataIndex: 'date',
    key: 'date',
  },
];

export default () => {
  return (
    <div>
      <Button
        style={{
          marginBottom: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel
            .addSheet('test')
            .addColumns(columns)
            .addDataSource(dataSource)
            .saveAs('测试.xlsx');
        }}
      >
        下载
      </Button>
      <Table bordered columns={columns} dataSource={dataSource} />
    </div>
  );
};
```
