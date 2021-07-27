import {
  IExcelColumn,
} from '../../app';

// export interface ITreeNode {
//   title: string;
//   x: number;
//   xMerge: number;
//   vMerge: number;
//   children: ITreeNode[] | null;
// }

export function columnsFilter(columns: IExcelColumn[]): IExcelColumn[] {
  return columns.filter(col => {
    if (col.__ignore__) return false;
    if (col.children) {
      col.children = columnsFilter(col.children)
    }
    return true;
  })
}

export function getColumnsMaxDepth(columns: IExcelColumn[], depth = 1) {
  const maxs = columns.map(col => getColumnDepth(col, depth))
  return Math.max.apply(Math, maxs)
}

function getColumnDepth(column: IExcelColumn, depth = 1): number {
  if (column.children) {
    return getColumnsMaxDepth(column.children, depth + 1)
  }
  return depth;
}

export function getColumnsMaxLength(columns: IExcelColumn[]) {
  return columns.reduce((prev, cur) => {
    return prev + getColumnLength(cur)
  }, 0)
}

function getColumnLength(column: IExcelColumn): number {
  if (column.children) {
    return getColumnsMaxLength(column.children)
  }
  return 1
}

export function flatColumns(columns: IExcelColumn[]) {
  return columns.reduce((prev, cur) => {
    return prev.concat(flatColumn(cur))
  }, [] as IExcelColumn[])
}

function flatColumn(column: IExcelColumn): IExcelColumn[] {
  if (column.children) {
    return flatColumns(column.children)
  }
  return [column];
}
