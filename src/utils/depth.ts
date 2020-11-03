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
 * 获取深度
 * @param column antd table columns props
 */
function getDepth(column: IExcelColumn) {
  let depth = 0;
  if (column.children?.length) {
    for (let col of column.children) {
      depth = Math.max(depth, getDepth(col));
    }
  }
  return depth + 1;
}

export default getDepth;
