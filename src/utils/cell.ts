import { Cell } from 'better-xlsx';
import setStyle from './style';

function drawCell(cell: Cell, props: ICellProps, config: ITbodyConfig = {}, isThead: boolean = false) {
  const { value, hMerge = 0, vMerge = 0, numFmt, formula, cellType, style = {} } = props;
  const { str2num } = config;
  // 尝试将值转化为数字
  if (str2num) {
    const num = Number(value);
    if (!isNaN(num)) {
      cell.value = num;
    } else {
      cell.value = value;
    }
  } else {
    cell.value = value;
  }
  // 声明了公式
  if (formula) {
    cell.setFormula(formula)
    return;
  }
  // 指定了单元格类型
  if (cellType) {
    if (cellType === 'TypeDate') {
      cell.setDate(new Date(value))
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

export default drawCell;
