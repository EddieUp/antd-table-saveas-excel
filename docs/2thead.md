## 定义表格头

在`Antd Table Columns ColumnProps`的类型上，增加了如下属性:

- \_\_excelTitle\_\_: 列名，当 title 为一个函数的时候，使用该参数来指定

- excelRender: 优先级比`render`高，支持返回\_\_style\_\_样式属性来自定义单元格样式，同样如果需要合并行列，返回 props(同 render 返回的格式)即可

- \_\_style\_\_: [列样式](/3types#istyle)

- \_\_numFmt\_\_: [列单元格格式](/3types#inumfmt)

- \_\_cellType\_\_: [列单元格类型](/3types#icelltype)

- \_\_ignore\_\_: 过滤该列，下载的 excel 中没有该列

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
      // 单位是CM
      width: 10,
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    __numFmt__: '0.00',
    render: (value, row, index) => {
      if (index === 1) {
        return {
          children: value,
          props: {
            rowSpan: 0,
          },
        };
      }
      return {
        children: value,
        props: {
          rowSpan: 2,
        },
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
