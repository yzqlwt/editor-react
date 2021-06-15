export function validNumber(value, defaultValue) {
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
export function calcMinMark(scale) {
  const range = [1, 2, 5];
  let rise = 1;
  let [num, index] = [0, 0];
  // eslint-disable-next-line
  b: while (true) {
    index = 0;
    while (index < range.length) {
      num = validNumber(range[index] * rise, rise);
      const length = validNumber(num * scale, num);
      // eslint-disable-next-line
      if (length >= 50) break b;
      index += 1;
    }
    rise *= 10;
    if (rise > 1000) {
      break;
    }
  }
  return Math.round(num);
}
