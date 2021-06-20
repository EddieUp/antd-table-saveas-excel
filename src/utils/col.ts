import { Col } from 'better-xlsx';
import setStyle from './style';
import px2cm from './px2cm';
import {
  IExcelColumn,
} from '../../app';
import { TExcel } from '../'

export function addCol(excel: TExcel, start: number, count: number, props: IExcelColumn[]) {
  for (let i = start; i < count + start; i++) {
    const col = excel.addCol();
    if (col) {
      drawCol(col, props[i - start])
    }
  }
}

function drawCol(col: Col, props: IExcelColumn) {
  const { width = 150, align = 'left', __style__ = {}, __numFmt__ } = props;
  if (width) {
    col.width = px2cm(width);
  }
  if (__style__.width) {
    col.width = __style__.width;
  }
  if (__numFmt__) {
    col.numFmt = __numFmt__;
  }
  setStyle(col, {
    ...__style__,
    h: align,
  });
}

export default drawCol;
