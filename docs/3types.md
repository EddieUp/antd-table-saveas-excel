## 类型定义

### IExcelColumn

```ts
interface IExcelColumn extends ColumnProps {
  __style__?: IStyle;
  __numFmt__?: INumFmt;
  __cellType__?: ICellType;
}
```

### ICellProps

```ts
interface ICellProps {
  value: string;
  hMerge?: number;
  vMerge?: number;
  cellType?: ICellType;
  numFmt?: INumFmt;
  formula?: string;
  style?: IStyle;
}
```

### ITbodyConfig

```ts
interface ITbodyConfig {
  // 字符串能转化成数字就转化成数字
  str2num?: boolean;
}
```

### IStyle

```ts
type IStyle = {
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
