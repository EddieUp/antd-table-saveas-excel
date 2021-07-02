
function getValueByStrPath(data: Record<string, any>, keys: string | string[]) {
  if (typeof keys === 'string' || typeof keys === 'number') return data[keys];
  let index = 0;
  let key = keys[0];
  let value = data;
  while (key) {
    value = value[key]
    index++;
    key = keys[index];
  }
  return value;
}

export default getValueByStrPath;
