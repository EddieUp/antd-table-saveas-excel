import { Cell } from 'better-xlsx';
import setStyle from './style';
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

function drawCell(
  cell: Cell,
  props: ICellProps,
  config: ITbodyConfig = {},
  isThead: boolean = false,
) {
  const {
    value,
    hMerge = 0,
    vMerge = 0,
    numFmt,
    formula,
    cellType,
    style = {},
  } = props;
  const { str2num } = config;
  // 尝试将值转化为数字
  if (str2num) {
    const num = Number(value);
    if (!isNaN(num)) {
      cell.value = num;
    } else {
      // 可能是千分位
      const num = String(value).replaceAll(',', '');
      const isThousand = !isNaN(Number(num));
      if (isThousand) {
        cell.value = Number(num);
        cell.numFmt = thousandToNumFmt(num);
      } else {
        cell.value = value;
      }
    }
  } else {
    cell.value = value;
  }
  if (String(value).endsWith('%')) {
    // 是一个百分比
    const num = parseFloat(String(value));
    cell.value = Number(num) / 100;
    cell.numFmt = percentToNumFmt(num);
  }
  // 声明了公式
  if (formula) {
    cell.setFormula(formula);
    return;
  }
  // 指定了单元格类型
  if (cellType) {
    if (cellType === 'TypeDate') {
      cell.setDate(new Date(value));
    } else {
      cell.cellType = cellType;
    }
    return;
  }
  // 指定了单元格格式
  if (numFmt) {
    cell.numFmt = numFmt;
  }
  // 合并
  cell.hMerge = hMerge;
  cell.vMerge = vMerge;
  // 横向合并的单元格，将内容居中
  if (hMerge && isThead) {
    style.h = 'center';
  }
  if (vMerge) {
    style.v = 'center';
  }
  setStyle(cell, style);
}

function getDecimal(data: string | number) {
  const str = String(data);
  const pointIndex = str.indexOf('.');
  if (pointIndex === -1) return 0;
  const decimalPart = str.slice(pointIndex + 1);
  return decimalPart.length;
}

function thousandToNumFmt(data: string | number) {
  const decimal = getDecimal(data);
  const numFmts: ['#,##0', '#,##0.0', '#,##0.00', '#,##0.000', '#,##0.0000'] = [
    '#,##0',
    '#,##0.0',
    '#,##0.00',
    '#,##0.000',
    '#,##0.0000',
  ];
  return numFmts[decimal] || numFmts[4];
}

function percentToNumFmt(data: string | number) {
  const decimal = getDecimal(data);
  const numFmts: ['0%', '0.0%', '0.00%', '0.000%', '0.0000%'] = [
    '0%',
    '0.0%',
    '0.00%',
    '0.000%',
    '0.0000%',
  ];
  return numFmts[decimal] || numFmts[2];
}

export default drawCell;
