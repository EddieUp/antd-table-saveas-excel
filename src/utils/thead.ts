import { Sheet } from 'better-xlsx';
import getDepth from './depth';
import getWidth from './width';
import drawCell from './cell';
import drawCol from './col';
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
} from '../../app';

/**
 * 绘制出表头的行列
 * @param sheet 表
 * @param columns antd table columns props
 * @param depth 不用传入，深度
 */
export function drawTheadSkeleton(
  sheet: Sheet,
  columns: IExcelColumn[],
  depth: number = 0,
) {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const children = column.children;
    sheet.row(depth);
    if (children?.length) {
      drawTheadSkeleton(sheet, children as IExcelColumn[], depth + 1);
    }
    // 内层
    else if (depth > 0) {
      // 增量绘制
      const col = sheet.col(sheet.maxCol);
      drawCol(col, column);
    }
    // 最外层
    else {
      // i = 0的时候，绘制1列，此时表的最大列数为1
      const col = sheet.col(i);
      drawCol(col, column);
    }
  }
}
/**
 * 绘制所有的单元格
 * @param sheet 表
 */
export function drawTheadCell(sheet: Sheet) {
  const { cols, rows } = sheet;
  const depth = rows.length;
  const width = cols.length;
  // 循环每列
  for (let i = 0; i < depth; i++) {
    for (let j = 0; j < width; j++) {
      rows[i].addCell();
    }
  }
  return { depth, width };
}
/**
 * 处理表格头参数，带上合并参数和坐标，方便后续处理
 * @param columns antd table columns props
 * @param depth 表头的行数
 */
export function handleColumns(columns: IExcelColumn[], depth: number) {
  let startX = 0;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const columnWidth = getWidth(column);
    handleColumn(column, depth, startX);
    startX += columnWidth;
  }
}
function handleColumn(column: IExcelColumn, depth: number, startX: number) {
  const columnDepth = getDepth(column);
  const columnWidth = getWidth(column);
  const children = column.children;
  if (!children || !children.length) {
    column['__vMerge__'] = depth - columnDepth;
    column['__x__'] = startX;
    // 列配置中会存在colSpan字段，用于合并列
    if (column.colSpan) {
      column['__hMerge__'] = column.colSpan - 1;
    }
  }
  // 如果该列有children，就要合并列
  else {
    column['__hMerge__'] = columnWidth - 1;
    column['__x__'] = startX;
    let childStartX = startX;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childWidth = getWidth(child);
      handleColumn(child, depth - 1, childStartX);
      childStartX += childWidth;
    }
  }
}

/**
 * 填入表头参数，绘制出表头
 * @param sheet 表
 * @param columns antd table columns props
 * @param depth 表头的行数
 */
export function fillAndDrawThead(
  sheet: Sheet,
  columns: IExcelColumn[],
  style: ICellProps['style'],
  depth = 0,
) {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const cell = sheet.cell(depth, column.__x__ || 0);
    drawCell(
      cell,
      {
        value: column.title,
        hMerge: column.__hMerge__ || 0,
        vMerge: column.__vMerge__ || 0,
        style: style,
      },
      {},
      true,
    );
    if (column.children?.length) {
      fillAndDrawThead(sheet, column.children, style, depth + 1);
    }
  }
}
