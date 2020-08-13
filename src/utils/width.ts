/**
 * 获取宽度
 * @param column antd table columns props
 */
function getWidth(column: IExcelColumn) {
  let breadth = 0;
  if (column.children?.length) {
    for (let col of column.children) {
      breadth += getWidth(col);
    }
  } else {
    breadth += 1;
  }
  return breadth;
}

export default getWidth;
