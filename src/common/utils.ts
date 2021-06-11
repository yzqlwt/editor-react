export function validNumber(value: any, defaultValue: number): number {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  if (value === null) {
    return defaultValue;
  }
  if (Number.isFinite(value)) {
    return value;
  }
  return defaultValue;
}

/**
 *计算最小刻度标数
 *
 * @export
 * @param {number} scale
 * @return {*}  {number}
 */
export function calcMinMark(scale: number): number {
  const range = [1, 2, 5]
  let rise = 1;
  let [num, index] = [0, 0];
  b: while (true) {
    index = 0;
    while (index < range.length) {
      num = validNumber(range[index] * rise, rise);
      const length = validNumber(num * scale, num);
      if (length >= 50) break b;
      index++;
    }
    rise *= 10;
    if (rise > 1000) {
      break;
    }
  }
  return Math.round(num);
}
