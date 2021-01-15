declare module '*.css';
declare module '*.less';
declare module 'better-xlsx' {
  export class File {
    /**
     * Add a new Sheet, with the provided name, to a File
     * @param {String} name Name of the Sheet
     * @return {Sheet}
     */
    addSheet: (name: string) => Sheet;
    /**
     * Save the File to an xlsx file.
     * @param  {String} [type='nodebuffer'] For Node.js use `nodebuffer` and browser use `blob` or `base64`.
     * @param {Boolean} [compress=false] For file compression.
     * @return {Promise|stream} For Node.js return `stream` and browser return Promise.
     */
    saveAs: (type: string, compress: boolean) => Promise<any>;
  }
  export class Sheet {
    rows: Row[];
    cols: Col[];
    maxRow: number;
    maxCol: number;
    /**
     * Create a Row and add it into the Sheet.
     * @return {Row}
     */
    addRow: () => Row;
    /**
     * Get Col of the sheet with index and create cols when `index > maxCol`.
     * @param  {Number} idx Index of the Col [from 0].
     * @return {Col}
     */
    col: (idx: number) => Col;
    /**
     * Get Row of the sheet with index and create rows when `index > maxRow`.
     * @param  {Number} idx Index of the Row [from 0].
     * @return {Row}
     */
    row: (idx: number) => Row;
    /**
     * Get Cell of the sheet with `(row, col)` and create cell when out of range.
     * @param  {Number} row
     * @param {Number} col
     * @return {Cell}
     */
    cell: (row: number, col: number) => Cell;
    /**
     * Set columns width from `startcol` to `endcol`.
     * @param {Number} startcol
     * @param {Number} endcol
     * @param {Number} width
     */
    setColWidth: (startcol: number, endcol: number, width: number) => void;
  }
  export class Row {
    cells: Cell[];
    /**
     * Set height of the Row with `cm` unit.
     * @param {Number} ht Height with `cm` unit
     */
    setHeightCM: (ht: number) => void;
    /**
     * Create a cell and add it into the Row.
     * @return {Cell}
     */
    addCell: () => Cell;
  }
  export class Col {
    width: number;
    numFmt: string;
    style: Style;
    setType: (cellType: string) => void;
  }
  export class Cell {
    value: string | number | Date | boolean;
    hMerge: number;
    vMerge: number;
    cellType: ICellType;
    numFmt: INumFmt;
    formula: string;
    style: Style;
    /**
     * Set cell value with String type.
     * @param {String} v
     */
    setString: (v: string) => void;
    /**
     * Set cell value with Date type.
     * @param {Date} v
     */
    setDate: (v: Date) => void;
    /**
     * Set cell value with DateTime type.
     * @param {Date} v
     */
    setDateTime: (v: Date) => void;
    /**
     * Set cell value with Number type.
     * @param {Number} v
     */
    setNumber: (v: number) => void;
    /**
     * Set cell value with Boolean type.
     * @param {Boolean} v
     */
    setBool: (v: boolean) => void;
    /**
     * Set cell formula.
     * @param {String} f - Formula like `B2*C2-D2`.
     */
    setFormula: (f: string) => void;
  }

  export class Style {
    border: {
      left: string;
      leftColor: string;
      right: string;
      rightColor: string;
      top: string;
      topColor: string;
      bottom: string;
      bottomColor: string;
    };
    fill: {
      patternType: string;
      fgColor: string;
      bgColor: string;
    };
    font: {
      size: number;
      name: string;
      family: number;
      charset: number;
      color: string;
      bold: boolean;
      i: boolean;
      u: boolean;
    };
    align: {
      h: IHorizontal;
      indent: number;
      shrinkToFit: boolean;
      textRotation: number;
      v: IVertical;
      wrapText: boolean;
    };
    applyBorder: boolean;
    applyFill: boolean;
    applyFont: boolean;
    applyAlignment: boolean;
  }
}

// 表格列属性
interface IExcelColumn {
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
interface ICellProps {
  value: string;
  hMerge?: number;
  vMerge?: number;
  cellType?: ICellType;
  numFmt?: INumFmt;
  formula?: string;
  style?: IStyle;
}
interface ITbodyConfig {
  // 字符串能转化成数字就转化成数字
  str2num?: boolean;
  // 还是放在列配置里比较好
  // 数值精度
  // precision?: number;
  // 是否转化成百分比
  // toPercent?: boolean;
}
interface IDataSource extends Object {
  __style__?: IStyle;
  __numFmt__?: INumFmt;
  __cellType__?: ICellType;
  [key: string]: any;
}
type IStyle = {
  height?: number;
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
type IHorizontal = 'general' | 'center' | 'left' | 'right';
type IVertical = 'general' | 'top' | 'bottom' | 'center';
type ICellType =
  | 'TypeString'
  | 'TypeBool'
  | 'TypeNumeric'
  | 'TypeDate'
  | 'TypeFormula'
  | 'TypeError'
  | 'TypeGeneral';
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
