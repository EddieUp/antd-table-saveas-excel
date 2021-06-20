## 类型定义

### IExcelColumn

继承`antd table columns`的接口，同时添加了额外属性

```ts
interface IExcelColumn extends ColumnProps {
  // 当title为一个函数的时候，使用该参数来指定
  __excelTitle__?: string;
  // 优先级更高的单元格渲染，需要行列合并的话和render一样返回一个对象即可
  excelRender?: (text: any, record: any, index: number) => string | object;
  // 列的样式
  __style__?: IStyle;
  // 显示格式
  __numFmt__?: INumFmt;
  // 单元格类型
  __cellType__?: ICellType;
}
```

### ICellProps

单元格的配置属性

```ts
interface ICellProps {
  // 单元格内容
  value: string;
  // 横向合并
  hMerge?: number;
  // 纵向合并
  vMerge?: number;
  // 单元格类型
  cellType?: ICellType;
  // 显示格式
  numFmt?: INumFmt;
  // 当单元格类型为公式的时候，填写该单元格
  formula?: string;
  // 单元格样式
  style?: IStyle;
}
```

### ITbodyConfig

在绘制表体的时候，添加的额外的配置，通常用来做一些转换

```ts
interface ITbodyConfig {
  // 字符串能转化成数字就转化成数字，方便excel的二次处理
  str2num?: boolean;
  // 内容结尾为%符号的是否自动转换为对应百分比格式
  str2Percent?: boolean;
}
```

### IStyle

单元格样式

```ts
type IStyle = {
  // 单位CM，CM和px的关系大概为 mac office 145px = 20cm（网上找的资料，请自行鉴定）
  height?: number;
  // 单位CM
  width?: number;
  border?: boolean;
  borderColor?: string;
  background?: string;
  fontSize?: number;
  fontName?: string;
  color?: string;
  bold?: boolean;
  i?: boolean;
  u?: boolean;
  h?: IHorizontal;
  indent?: number;
  shrinkToFit?: boolean;
  textRotation?: number;
  v?: IVertical;
  wrapText?: boolean;
};
```

### IHorizontal

```ts
type IHorizontal = 'general' | 'center' | 'left' | 'right';
```

### IVertical

```ts
type IVertical = 'general' | 'top' | 'bottom' | 'center';
```

### ICellType

```ts
type ICellType =
  | 'TypeString'
  | 'TypeBool'
  | 'TypeNumeric'
  | 'TypeDate'
  | 'TypeFormula'
  | 'TypeError'
  | 'TypeGeneral';
```

### INumFmt

```ts
type INumFmt =
  | 'general'
  | '0'
  | '0.0'
  | '0.00'
  | '0.000'
  | '0.0000'
  | '#,##0'
  | '#,##0.0'
  | '#,##0.00'
  | '#,##0.000'
  | '#,##0.0000'
  | '0%'
  | '0.0%'
  | '0.00%'
  | '0.000%'
  | '0.0000%'
  | '0.00e+00'
  | '# ?/?'
  | '# ??/??'
  | 'mm-dd-yy'
  | 'd-mmm-yy'
  | 'd-mmm'
  | 'mmm-yy'
  | 'h:mm am/pm'
  | 'h:mm:ss am/pm'
  | 'h:mm'
  | 'h:mm:ss'
  | 'm/d/yy h:mm'
  | '#,##0 ;(#,##0)'
  | '#,##0 ;[red](#,##0)'
  | '#,##0.00;(#,##0.00)'
  | '#,##0.00;[red](#,##0.00)'
  | '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)'
  | '_("$"* #,##0_);_("$* (#,##0);_("$"* "-"_);_(@_)'
  | '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)'
  | '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)'
  | 'mm:ss'
  | '[h]:mm:ss'
  | 'mmss.0'
  | '##0.0e+0'
  | '@';
```
