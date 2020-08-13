## 定义表格头

在`Antd Table Columns ColumnProps`的类型上，增加了如下属性:

- \_\_style\_\_: [列样式](/3types#istyle)

- \_\_numFmt\_\_: [列单元格格式](/3types#inumfmt)

- \_\_cellType\_\_: [列单元格类型](/3types#icelltype)

示例:

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
    __style__: {
      color: 'FF88c849',
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    __numFmt__: '0.00',
  },
  {
    title: '出生',
    dataIndex: 'date',
    key: 'date',
    __cellType__: 'TypeDate',
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
