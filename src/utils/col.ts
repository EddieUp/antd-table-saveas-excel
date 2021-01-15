import { Col } from 'better-xlsx';
import setStyle from './style';
import px2cm from './px2cm';
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

function drawCol(col: Col, props: IExcelColumn) {
  const { width = 150, align = 'left', __style__ = {}, __numFmt__ } = props;
  if (width) {
    col.width = px2cm(width);
  }
  if (__style__.width) {
    col.width = px2cm(__style__.width);
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
