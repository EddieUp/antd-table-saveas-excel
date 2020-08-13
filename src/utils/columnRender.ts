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
  // 单纯的react节点
  if (data.$$typeof) {
    o.children = data.props?.children;
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

export default getColumnRenderValue;
