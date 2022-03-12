import { TExcel } from '../';
import drawCell from './cell';
import {
  IExcelColumn,
  ICellProps,
} from '../../app';
import { getColumnsMaxLength } from './columns';

/**
 * 渲染表格头
 * @param excel TExcel
 * @param columns 传入的表头配置，antd table columns props
 * @param style 表头样式
 * @param depth 表头深度
 * @param x 开始绘制的单元格，第几列
 * @param y 开始绘制的单元格，第几行
 */
export function renderThead(excel: TExcel, columns: IExcelColumn[], style: ICellProps['style'], depth: number, x = 0, y = 0) {
  for (let col of columns) {
    const colLen = getColumnsMaxLength([col]);
    const cell = excel.sheet!.cell(y, x);
    let value = '';
    if (typeof col.__excelTitle__ === 'string') {
      value = col.__excelTitle__;
    } else {
      if (typeof col.title === 'string') {
        value = col.title;
      } else {
        throw new Error('title must be a string, or use __excelTitle__');
      }
    }
    const hMerge = colLen - 1;
    let vMerge = 0;
    if (!col.children?.length) {
      vMerge = depth - 1 - y;
    }
    drawCell(
      cell,
      {
        value,
        hMerge,
        vMerge,
        style: {
          h: hMerge ? 'center' : 'left',
          ...style,
        },
      }
    );
    if (col.children?.length) {
      renderThead(excel, col.children, style, depth, x, y + 1);
    }
    x += hMerge ? hMerge + 1 : 1;

  }
}
