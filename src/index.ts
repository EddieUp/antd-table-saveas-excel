import { File, Sheet } from 'better-xlsx';
import {
  renderThead
} from './utils/thead';
import { renderTbody } from './utils/tbody';
import { saveAs } from 'file-saver';
import {
  IStyle,
  IExcelColumn,
  ITbodyConfig,
} from '../app';
import { addRow } from './utils/row';
import { addCol } from './utils/col';
import {
  columnsFilter,
  getColumnsMaxDepth,
  getColumnsMaxLength,
  flatColumns
} from './utils/columns';
import px2cm from './utils/px2cm';
import drawCell from './utils/cell'

export class Excel {
  file: File;
  sheet: Sheet | undefined;
  columns: IExcelColumn[] | undefined;
  currentRow = 0;
  currentCol = 0;
  defaultTheadCellStyle: IStyle = {
    background: 'FF88c849',
    color: 'FF333333',
    fontSize: 12,
    bold: true,
    border: true,
    v: 'center',
    wrapText: true,
  };
  defaultTbodyCellStyle: IStyle = {
    v: 'bottom',
    wrapText: true,
    fontSize: 12,
  };
  rowHeight = 1;
  constructor() {
    this.file = new File();
  }
  /**
   * 添加工作表
   * @param name 工作表名称
   */
  addSheet(name: string) {
    if (!this.file) return this;
    this.currentRow = 0;
    this.currentCol = 0;
    this.sheet = this.file.addSheet(name);
    return this;
  }
  /**
   * 添加一行
   * @returns
   */
  addRow() {
    if (!this.sheet) {
      throw new Error('please use addSheet before this');
    };
    this.currentRow++;
    return this.sheet.row(this.sheet.maxRow);
  }
  /**
   * 添加一列
   * @returns
   */
  addCol() {
    if (!this.sheet) {
      throw new Error('please use addSheet before this');
    };
    this.currentCol++;
    return this.sheet.col(this.sheet.maxCol);
  }
  drawCell(x: number, y: number, props: ICellProps) {
    if (!this.sheet) {
      throw new Error('please use addSheet before this');
    };
    const vMerge = props?.vMerge || 0;
    const rows = vMerge + 1;
    if (this.currentRow < y + rows) {
      for (let i = 0; i < rows; i++) {
        this.addRow()
      }
    }
    const cell = this.sheet.cell(y, x);
    drawCell(cell, props)
    return this;
  }
  /**
   * 设置行高
   * @param value number
   * @param unit 单位 'cm' | 'px'，默认为px
   */
  setRowHeight(value: number, unit: 'cm' | 'px' = 'px') {
    if (typeof value !== 'number') {
      throw new Error('value must be a number');
    }
    let v = value;
    if (unit === 'px') {
      v = px2cm(v);
    }
    this.rowHeight = v;
    return this;
  }
  /**
   * 添加表格配置
   * @param columns antd table columns
   * @param direction 'h' | 'v' 添加的方向，适用于追加表
   */
  addColumns(columns: IExcelColumn[]) {
    if (!this.sheet) {
      throw new Error('please use addSheet before this')
    }
    let x = this.currentCol;
    let y = this.sheet.maxRow;
    const filteredColumns = columnsFilter(columns);
    const maxDepth = getColumnsMaxDepth(filteredColumns);
    const maxLength = getColumnsMaxLength(filteredColumns);
    const flatedColumns = flatColumns(filteredColumns);
    addRow(this, this.currentRow, maxDepth, this.rowHeight);
    addCol(this, this.currentCol, maxLength, flatedColumns);

    renderThead(this, filteredColumns, this.defaultTheadCellStyle, y + maxDepth, x, y);
    this.columns = filteredColumns;
    this.currentCol -= maxLength;
    return this;
  }
  /**
   * 添加数据
   * @param dataSource 数据
   * @param config 表格体配置
   */
  addDataSource(dataSource: any[], config: ITbodyConfig = {}) {
    if (!this.sheet || !this.columns) {
      throw new Error('please use addSheet and addColumns before this')
    };

    const flatedColumns = flatColumns(this.columns);
    renderTbody(
      this,
      dataSource,
      flatedColumns,
      config,
    );
    return this;
  }
  /**
   * 更改默认的表格头单元格样式属性，不包含表格体
   * @param style 单元格样式属性
   */
  setTHeadStyle(style: IStyle) {
    this.defaultTheadCellStyle = {
      ...this.defaultTheadCellStyle,
      ...style,
    };
    return this;
  }
  /**
   * 更改默认的单元格样式属性，不包含表格头
   * @param style 单元格样式属性
   */
  setTBodyStyle(style: IStyle) {
    this.defaultTbodyCellStyle = {
      ...this.defaultTbodyCellStyle,
      ...style,
    };
    return this;
  }
  /**
   * 另存为
   * @param name 名称
   * @param type 保存类型 'blob' | 'base64'
   * @param compress 是否压缩 boolean
   */
  saveAs(name: string, type: 'blob' = 'blob', compress: boolean = true) {
    if (!this.file) return;
    if (type === 'blob') {
      this.file
        .saveAs(type, compress)
        .then(data => {
          saveAs(data, name);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
}

export type TExcel = InstanceType<typeof Excel>
