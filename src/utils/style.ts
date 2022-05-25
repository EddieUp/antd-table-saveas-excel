import { Cell, Col } from 'better-xlsx';
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

function getDefaultFontName() {
  if (typeof navigator === 'undefined')
    return 'Microsoft YaHei';
  
  var isMac = /macintosh|mac os x/i.test(navigator?.userAgent.toLowerCase());
  return isMac ? 'PingFang SC' : 'Microsoft YaHei';
}

const STYLEMAP: {
  [key in keyof IStyle]: (cell: Cell | Col, style: IStyle) => void;
} = {
  border: (cell: Cell | Col, style: IStyle = {}) => {
    const border = style.border;
    const borderColor = style.borderColor || 'FF000000';
    if (!border) return;
    cell.style.border.top = 'thin';
    cell.style.border.topColor = borderColor;
    cell.style.border.right = 'thin';
    cell.style.border.rightColor = borderColor;
    cell.style.border.bottom = 'thin';
    cell.style.border.bottomColor = borderColor;
    cell.style.border.left = 'thin';
    cell.style.border.leftColor = borderColor;
  },
  background: (cell: Cell | Col, style: IStyle = {}) => {
    const background = style.background;
    if (background) {
      // FF 表示不透明 00 表示透明
      // fg 前景色 bg 背景色
      cell.style.fill.patternType = 'solid';
      cell.style.fill.fgColor = background;
      cell.style.fill.bgColor = 'ffffffff';
    }
  },
  fontSize: (cell: Cell | Col, style: IStyle = {}) => {
    const fontSize = style.fontSize;
    if (fontSize) {
      cell.style.font.size = fontSize;
    }
  },
  fontName: (cell: Cell | Col, style: IStyle = {}) => {
    const fontName = style.fontName;
    if (fontName) {
      cell.style.font.name = fontName;
    }
  },
  color: (cell: Cell | Col, style: IStyle = {}) => {
    const color = style.color;
    if (color) {
      cell.style.font.color = color;
    }
  },
  bold: (cell: Cell | Col, style: IStyle = {}) => {
    const bold = style.bold;
    if (bold) {
      cell.style.font.bold = bold;
    }
  },
  i: (cell: Cell | Col, style: IStyle = {}) => {
    const i = style.i;
    if (i) {
      cell.style.font.i = i;
    }
  },
  u: (cell: Cell | Col, style: IStyle = {}) => {
    const u = style.u;
    if (u) {
      cell.style.font.u = u;
    }
  },
  h: (cell: Cell | Col, style: IStyle = {}) => {
    const h = style.h;
    if (h) {
      cell.style.align.h = h;
    }
  },
  indent: (cell: Cell | Col, style: IStyle = {}) => {
    const indent = style.indent;
    if (indent) {
      cell.style.align.indent = indent;
    }
  },
  shrinkToFit: (cell: Cell | Col, style: IStyle = {}) => {
    const shrinkToFit = style.shrinkToFit;
    if (shrinkToFit) {
      cell.style.align.shrinkToFit = shrinkToFit;
    }
  },
  textRotation: (cell: Cell | Col, style: IStyle = {}) => {
    const textRotation = style.textRotation;
    if (textRotation) {
      cell.style.align.textRotation = textRotation;
    }
  },
  v: (cell: Cell | Col, style: IStyle = {}) => {
    const v = style.v;
    if (v) {
      cell.style.align.v = v;
    }
  },
  wrapText: (cell: Cell | Col, style: IStyle = {}) => {
    const wrapText = style.wrapText;
    if (wrapText) {
      cell.style.align.wrapText = wrapText;
    }
  },
};

function setStyle(cell: Cell | Col, style: IStyle = {}) {
  const fontName = style.fontName;
  if (!fontName) {
    cell.style.font.name = getDefaultFontName();
  }
  for (let key of Object.keys(style)) {
    if (key in STYLEMAP) {
      //@ts-ignore
      STYLEMAP[key](cell, style);
    }
  }
}

export default setStyle;
