import {
  IStyle,
} from '../../app';
/**
 * 获取column render的结果的参数
 * @param data column render的结果
 */
function getColumnRenderValue(data: any) {
  let o: {
    children: string;
    colSpan: number;
    rowSpan: number;
    __style__: IStyle;
  } = {
    children: '',
    colSpan: 0,
    rowSpan: 0,
    __style__: {}
  };
  if (typeof data !== 'object') {
    o.children = data;
    return o;
  }
  // 单纯的react节点
  if (data.$$typeof) {
    o.children = getChildren(data);
  }
  // 混合react节点和属性
  if (data.children) {
    if (typeof data.children === 'object') {
      o.children = getChildren(data.children);
    } else {
      o.children = data.children;
    }
  }
  if (data.props) {
    o.colSpan = data.props?.colSpan || 0;
    o.rowSpan = data.props?.rowSpan || 0;
    if (o.colSpan >= 1) {
      o.colSpan -= 1;
    }
    if (o.rowSpan >= 1) {
      o.rowSpan -= 1;
    }
  }
  if (data.__style__) {
    o.__style__ = data.__style__;
  }
  return o;
}

interface IReactNode {
  props: {
    children: IReactNode[] | string;
  }
}
function getChildren(data: IReactNode): string {
  const { props } = data || {}
  if (typeof props.children === 'string') return props.children
  return props.children.reduce((prev, cur) => {
    if (typeof prev === 'string') {
      return prev + ' ' + getChildren(cur)
    }
    return getChildren(prev) + ' ' + getChildren(cur)
  }, '')
}

export default getColumnRenderValue;
