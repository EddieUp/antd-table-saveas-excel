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

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.addSheet('测试工作表').addColumns([
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'age',
    dataIndex: 'age',
  },
]);
```

### addDataSource

添加表格数据

- 数据
- [表格体配置(可选)](/3types#itbodyconfig)

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel
  .addSheet('测试工作表')
  .addColumns([
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
  ])
  .addDataSource([
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

### setRowHeight

设置行高

- 数值
- 单位：'cm' | 'px'，默认为 px

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.setRowHeight(100);
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

### addRow

添加一行空行，通常用于添加额外表的时候，用来间隔，<u>需要注意的是：该方法不返回 excel 实例对象</u>

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.addSheet('测试工作表');
excel.addRow();
```

### addCol

添加一行空列，通常用于添加额外表的时候，用来间隔，<u>需要注意的是：该方法不返回 excel 实例对象</u>

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.addSheet('测试工作表');
excel.addCol();
```

### drawCell

绘制单元格，当前的 y 可以通过`excel.currentRow`获取

| 参数说明  | 类型                             | 默认值 |
| --------- | -------------------------------- | ------ |
| x(第几列) | number                           | --     |
| y(第几行) | number                           | --     |
| props     | [ICellProps](/3types#ICellProps) | --     |

```js
import { Excel } from 'antd-table-saveas-excel';
const excel = new Excel();

excel.addSheet('test');
excel.drawCell(0, 0, {
  hMerge: 2,
  vMerge: 2,
  value: 'drawCell value',
  style: {
    bold: true,
    v: 'center',
    h: 'center',
  },
});
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
