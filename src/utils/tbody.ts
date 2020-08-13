import { Sheet } from 'better-xlsx';
import drawCell from './cell';
import getColumnRenderValue from './columnRender';

export function fillAndDrawTbody(sheet: Sheet, dataSource: IDataSource[], allColumns: IExcelColumn[], defaultStyle: IStyle, height = 1, config: ITbodyConfig = {}) {
  dataSource.forEach((data, index) => {
    const row = sheet.addRow();
    row.setHeightCM(height);
    for (let column of allColumns) {
      const { dataIndex, __cellType__, __numFmt__, __style__ = {} } = column;
      let value = data[dataIndex];
      const cell = row.addCell();
      let hMerge = 0, vMerge = 0;
      if (column.render) {
        const renderValue = column.render(value, data, index);
        const { children, colSpan, rowSpan } = getColumnRenderValue(renderValue);
        value = children;
        hMerge = colSpan;
        vMerge = rowSpan;
      }
      drawCell(cell, {
        value,
        hMerge,
        vMerge,
        cellType: __cellType__,
        numFmt: __numFmt__,
        style: {
          ...defaultStyle,
          ...__style__,
          // 允许每一行数据带上样式
          ...(data.__style__ || {}),
        }
      }, config)
    }
  })
}

export function getColumns(columns: IExcelColumn[]) {
  let indexes: IExcelColumn[] = [];
  for (let column of columns) {
    const index = getColumn(column);
    indexes = indexes.concat(index);
  }
  return indexes;
}

function getColumn(column: IExcelColumn): IExcelColumn[] {
  const children = column.children;
  let indexes: IExcelColumn[] = [];
  if (children?.length) {
    for (let child of children) {
      const index = getColumn(child);
      indexes = indexes.concat(index);
    }
  } else {
    indexes.push(column);
  }
  return indexes;
}
