import { Row, Cell } from 'better-xlsx';
import drawCell from './cell';
import getColumnRenderValue from './columnRender';
import {
  IStyle,
  IExcelColumn,
  ITbodyConfig,
  IDataSource,
} from '../../app';
import getValueByStrPath from './getValueByStrPath';
import { TExcel } from '../'

export function renderTbody(
  excel: TExcel,
  dataSource: IDataSource[],
  allColumns: IExcelColumn[],
  config: ITbodyConfig = {},
) {
  dataSource.forEach((data, index) => {
    let row: Row = excel.addRow();
    row.setHeightCM(excel.rowHeight);
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
      const { dataIndex, __cellType__, __numFmt__, __style__ = {} } = column;
      let value = getValueByStrPath(data, dataIndex);
      let cell: Cell = excel.sheet!.cell(excel.currentRow - 1, excel.currentCol + i);
      let hMerge = 0;
      let vMerge = 0;
      let renderValue = null;
      let cellStyle: IStyle = {};
      let formula

      if (column.excelRender) {
        renderValue = column.excelRender(value, data, index);
      } else if (column.render) {
        renderValue = column.render(value, data, index);
      }
      if (renderValue !== null) {
        const { children, colSpan, rowSpan, __style__ } = getColumnRenderValue(
          renderValue,
        );
        value = children;
        hMerge = colSpan;
        vMerge = rowSpan;
        cellStyle = __style__;
        if (cellStyle && cellStyle.height) {
          row.setHeightCM(cellStyle.height);
        }
      }

      if (column.__cellType__ === "TypeFormula") {
        formula = renderValue as string;
      }

      drawCell(
        cell,
        {
          value,
          formula,
          hMerge,
          vMerge,
          cellType: __cellType__,
          numFmt: __numFmt__,
          style: {
            ...excel.defaultTbodyCellStyle,
            ...__style__,
            // 允许单元格样式
            ...cellStyle
          },
        },
        config,
      );
    }
  });
}
