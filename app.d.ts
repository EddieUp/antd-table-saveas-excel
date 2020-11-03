// 表格列属性
export interface IExcelColumn {
  title: string;
  dataIndex: string;
  width?: number;
  children?: IExcelColumn[];
  align?: 'left' | 'right' | 'center';
  colSpan?: number;
  render?: (text: any, record: any, index: number) => React.ReactNode | object;
  excelRender?: (
    text: any,
    record: any,
    index: number,
  ) => React.ReactNode | object;
  __style__?: IStyle;
  __numFmt__?: INumFmt;
  __cellType__?: ICellType;
  // 自动生成的私有属性，不要传入
  __hMerge__?: number;
  __vMerge__?: number;
  __x__?: number;
}
// 单元格属性
export interface ICellProps {
  value: string;
  hMerge?: number;
  vMerge?: number;
  cellType?: ICellType;
  numFmt?: INumFmt;
  formula?: string;
  style?: IStyle;
}
export interface ITbodyConfig {
  // 字符串能转化成数字就转化成数字
  str2num?: boolean;
  // 还是放在列配置里比较好
  // 数值精度
  // precision?: number;
  // 是否转化成百分比
  // toPercent?: boolean;
}
export interface IDataSource extends Object {
  __style__?: IStyle;
  __numFmt__?: INumFmt;
  __cellType__?: ICellType;
  [key: string]: any;
}
export type IStyle = {
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
export type IHorizontal = 'general' | 'center' | 'left' | 'right';
export type IVertical = 'general' | 'top' | 'bottom' | 'center';
export type ICellType =
  | 'TypeString'
  | 'TypeBool'
  | 'TypeNumeric'
  | 'TypeDate'
  | 'TypeFormula'
  | 'TypeError'
  | 'TypeGeneral';
export type INumFmt =
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
