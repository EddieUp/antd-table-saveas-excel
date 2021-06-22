import { Cell } from 'better-xlsx';
import setStyle from './style';
import {
  ITbodyConfig,
  ICellProps,
} from '../../app';

function drawCell(
  cell: Cell,
  props: ICellProps,
  config: ITbodyConfig = {},
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
  const { str2num, str2Percent } = config;
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
  if (str2Percent && String(value).endsWith('%')) {
    // 可以转化为百分比的话进行设置
    const num = Number(String(value).slice(0, -1));
    if (!isNaN(num)) {
      cell.value = Number(num) / 100;
      cell.numFmt = percentToNumFmt(num);
    }
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
    // return;
  }
  // 指定了单元格格式
  if (numFmt) {
    cell.numFmt = numFmt;
  }
  // 合并
  cell.hMerge = hMerge;
  cell.vMerge = vMerge;
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
