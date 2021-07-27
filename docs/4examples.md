## 更多示例

### 合并单元格

示例:

```tsx
import React from 'react';
import { Table, Button } from 'antd';
import { Excel } from 'antd-table-saveas-excel';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, row, index) => {
      if (index < 4) {
        return <a>{text}</a>;
      }
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    },
  },
  {
    title: '1Age%',
    dataIndex: ['age', 'a'],
    render: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: {
      a: 32,
    },
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: {
      a: 42,
    },
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: {
      a: 32,
    },
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: {
      a: 32,
    },
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: {
      a: 32,
    },
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
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
            .addDataSource(data, {
              str2Percent: true,
            })
            .saveAs('测试.xlsx');
        }}
      >
        下载
      </Button>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
```

### 复杂的表头

示例:

```tsx
import React from 'react';
import { Table, Button } from 'antd';
import { Excel } from 'antd-table-saveas-excel';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

export default () => {
  return (
    <div>
      <Button
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel
            .addSheet('test')
            .addColumns(columns)
            .addDataSource(data)
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        下载
      </Button>
      <Button
        style={{
          marginBottom: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel.addSheet('test');
          excel.addRow();
          excel.addRow();
          excel.addRow();
          excel.addCol();
          excel.addCol();
          excel.addCol();
          excel.addCol();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        下载2
      </Button>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
```

### 单个 sheet 多个表格

示例:

```tsx
import React from 'react';
import { Table, Button } from 'antd';
import { Excel } from 'antd-table-saveas-excel';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
  {
    title: 'Name',
    dataIndex: ['name', 'inner', 'text'],
    render: (text, row, index) => {
      if (index < 4) {
        return <a>{text}</a>;
      }
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    render: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  },
];

const data = [
  {
    key: '1',
    name: {
      inner: {
        text: 'John Brown',
      },
    },
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: {
      inner: {
        text: 'Jim Green',
      },
    },
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: {
      inner: {
        text: 'Joe Black',
      },
    },
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: {
      inner: {
        text: 'Jim Red',
      },
    },
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: {
      inner: {
        text: 'Jake White',
      },
    },
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];

export default () => {
  return (
    <div>
      <Button
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel
            .addSheet('test')
            .addColumns(columns)
            .addDataSource(data)
            .addRow();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        下载
      </Button>
      <Button
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel.addSheet('test').addRow();
          excel.addRow();
          excel.addRow();
          excel.addCol();
          excel.addCol();
          excel.addCol();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .addRow();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .addCol();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        垂直任意布局
      </Button>
      <Button
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel.addSheet('test').addRow();
          excel.addRow();
          excel.addRow();
          excel.addCol();
          excel.addCol();
          excel.addCol();
          excel
            .addColumns(columns)
            .addColumns(columns)
            .addDataSource(data)
            .addRow();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .addRow();
          excel.addCol();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        垂直任意布局
      </Button>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
```

### 多个 sheet

示例:

```tsx
import React from 'react';
import { Table, Button } from 'antd';
import { Excel } from 'antd-table-saveas-excel';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
  {
    title: 'Name',
    dataIndex: ['name', 'inner', 'text'],
    render: (text, row, index) => {
      if (index < 4) {
        return <a>{text}</a>;
      }
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    render: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  },
];

const data = [
  {
    key: '1',
    name: {
      inner: {
        text: 'John Brown',
      },
    },
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: {
      inner: {
        text: 'Jim Green',
      },
    },
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: {
      inner: {
        text: 'Joe Black',
      },
    },
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: {
      inner: {
        text: 'Jim Red',
      },
    },
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: {
      inner: {
        text: 'Jake White',
      },
    },
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];

export default () => {
  return (
    <div>
      <Button
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel
            .addSheet('test1')
            .addColumns(columns)
            .addDataSource(data);
          excel
            .addSheet('test2')
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        下载
      </Button>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
```

### 自定义单元格渲染

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
          excel.addSheet('test');
          excel
            .drawCell(0, 0, {
              hMerge: 2,
              vMerge: 2,
              value: 'drawCell value',
              style: {
                bold: true,
                v: 'center',
                h: 'center',
              },
            })
            .addColumns(columns)
            .addDataSource(dataSource);
          excel.drawCell(0, excel.currentRow, {
            hMerge: 2,
            vMerge: 2,
            value: 'drawCell value',
            style: {
              bold: true,
              v: 'center',
              h: 'center',
            },
          });

          excel
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

### 过滤列

过滤列 age 列、Door No.列、 company 列, 示例:

```tsx
import React from 'react';
import { Table, Button } from 'antd';
import { Excel } from 'antd-table-saveas-excel';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        sorter: (a, b) => a.age - b.age,
        __ignore__: true,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
                __ignore__: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
    __ignore__: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

export default () => {
  return (
    <div>
      <Button
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel
            .addSheet('test')
            .addColumns(columns)
            .addDataSource(data)
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        下载
      </Button>
      <Button
        style={{
          marginBottom: 20,
        }}
        onClick={() => {
          const excel = new Excel();
          excel.addSheet('test');
          excel.addRow();
          excel.addRow();
          excel.addRow();
          excel.addCol();
          excel.addCol();
          excel.addCol();
          excel.addCol();
          excel
            .addColumns(columns)
            .addDataSource(data)
            .addColumns(columns)
            .addDataSource(data)
            .saveAs('测试.xlsx');
        }}
      >
        下载2
      </Button>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
```
