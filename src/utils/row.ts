import { TExcel } from '../'

/**
 * 添加行
 * @param excel Excel实例
 * @param count 行数
 * @param height 行高(单位: CM)
 */
export function addRow(excel: TExcel, start: number, count: number, height: number) {
  for (let i = start; i < count + start; i++) {
    const row = excel.addRow();
    if (row.setHeightCM) {
      row.setHeightCM(height);
    }
  }
}
