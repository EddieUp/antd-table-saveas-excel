import { File, Sheet } from 'better-xlsx';
import {
  drawTheadSkeleton,
  fillAndDrawThead,
  handleColumns,
  drawTheadCell,
} from './utils/thead';
import { fillAndDrawTbody, getColumns } from './utils/tbody';
import setStyle from './utils/style';
import { saveAs } from 'file-saver';
import {
  IStyle,
  IExcelColumn,
  ITbodyConfig,
  ICellProps,
  IDataSource,
  IHorizontal,
  IVertical,
  ICellType,
  INumFmt,
} from '../app';

export class Excel {
  file: File;
  sheet: Sheet | undefined;
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
  columns: IExcelColumn[] | undefined;
  constructor() {
    this.file = new File();
  }
  /**
   * 添加工作表
   * @param name 工作表名称
   */
  addSheet(name: string) {
    if (!this.file) return this;
    this.sheet = this.file.addSheet(name);
    return this;
  }
  /**
   * 添加表格配置
   * @param columns antd table columns
   * @param rowHeight 行高
   */
  addColumns(columns: IExcelColumn[], rowHeight = 1) {
    if (!this.sheet) return this;
    this.columns = columns;
    drawTheadSkeleton(this.sheet, columns);
    const { depth } = drawTheadCell(this.sheet);
    handleColumns(columns, depth);
    fillAndDrawThead(this.sheet, columns, this.defaultTheadCellStyle);
    // 处理行高
    const { rows } = this.sheet;
    for (let row of rows) {
      row.setHeightCM(rowHeight);
      // 如果需要设置边框颜色，需要对所有单元格进行设置，fillAndDrawThead会忽略掉合并项的设置
      if (
        this.defaultTheadCellStyle?.border &&
        this.defaultTheadCellStyle?.borderColor
      ) {
        const cells = row.cells;
        for (let cell of cells) {
          setStyle(cell, {
            border: true,
            borderColor: this.defaultTheadCellStyle.borderColor,
          });
        }
      }
    }
    return this;
  }
  /**
   * 添加数据
   * @param dataSource 数据
   * @param config 表格体配置
   */
  addDataSource(dataSource: any[], config: ITbodyConfig = {}) {
    if (!this.sheet || !this.columns) return this;
    const allColumns = getColumns(this.columns);
    fillAndDrawTbody(
      this.sheet,
      dataSource,
      allColumns,
      this.defaultTbodyCellStyle,
      1,
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
