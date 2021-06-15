export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone = () => {
    return new Point(this.x, this.y);
  };

  toString = () => {
    return `x:{this.x}`;
  };
}
