## 定义表格头

在`Antd Table Columns ColumnProps`的类型上，增加了如下属性:

- excelRender: 自定义的 render，优先级比`render`高。支持返回\_\_style\_\_样式属性来自定义单元格样式

- \_\_style\_\_: [列样式](/3types#istyle)

- \_\_numFmt\_\_: [列单元格格式](/3types#inumfmt)

- \_\_cellType\_\_: [列单元格类型](/3types#icelltype)

示例:

再`columns`的配置中使用到了上面的属性，可以看实际效果

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
      // 单位是CM
      width: 10,
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    __numFmt__: '0.00',
    render: value => {
      return {
        children: value,
        __style__: {
          color: 'FF88c849',
          bold: true,
        },
      };
    },
  },
  {
    title: '出生',
    dataIndex: 'date',
    key: 'date',
    __cellType__: 'TypeDate',
    excelRender: (value, row, index) => {
      if (index === 0) {
        return {
          children: value,
          __style__: {
            color: 'FF88c849',
            h: 'center',
            v: 'center',
            // 单位是CM
            height: 2,
          },
        };
      }
      return {
        children: value,
        __style__: {
          color: 'FF88c849',
          h: 'center',
          v: 'center',
          // 单位是CM
          height: 1,
        },
      };
    },
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
