
function getValueByStrPath(data: Record<string, any>, keys: string | string[]) {
  if (typeof keys !== 'object') return data[keys];
  if (!Array.isArray(keys)) {
    console.error('excel-dataIndex: Expected string or string[]')
    return '';
  }
  let index = 0;
  let key = keys[0];
  let value = data;
  try {
    while (key) {
      value = value[key]
      index++;
      key = keys[index];
    }
  } catch (e) {
    return '';
  }
  if (typeof value !== 'object') {
    return value;
  }
  console.error('excel-cell-value: Unexpected object')
  return '';
}

export default getValueByStrPath;
