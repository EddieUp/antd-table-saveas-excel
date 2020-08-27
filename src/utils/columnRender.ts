/**
 * 获取column render的结果的参数
 * @param data column render的结果
 */
function getColumnRenderValue(data: any) {
  let o = {
    children: '',
    colSpan: 0,
    rowSpan: 0
  }
  if (typeof data !== 'object') {
    o.children = data;
    return o;
  }
  // 单纯的react节点
  if (data.$$typeof) {
    o.children = getLastChildren(data);
  }
  // 混合react节点和属性
  if (data.children) {
    if (typeof data.children === 'object') {
      o.children = data.children.props?.children;
    } else {
      o.children = data.children;
    }
  }
  if (data.props) {
    o.colSpan = data.props?.colSpan || 0;
    o.rowSpan = data.props?.rowSpan || 0;
    if (o.colSpan > 1) {
      o.colSpan -= 1
    }
    if (o.rowSpan > 1) {
      o.rowSpan -= 1
    }
  }
  return o;
}

function getLastChildren(data: any): string {
  const props = data.props;
  if (props.children && typeof props.children === 'object') {
    return getLastChildren(props.children);
  }
  return props?.children;
}

export default getColumnRenderValue;
