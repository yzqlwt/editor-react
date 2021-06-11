import React from "react";

class Ruler extends React.Component {
  static TYPE_HORIZONTAL = "type_horizontal";
  static TYPE_VERTICAL = "type_vertical";
  constructor() {
    super();
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.drawRuler();
  }

  drawRuler() {
    const width = this.props.width;
    const height = this.props.height;
    const type = this.props.type;
    const gap = this.props.gap;
    const scale = this.props.scale;
    const canvas = this.canvas.current;
    const valueGap = gap * scale;
    const markGap = valueGap / 10;
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.strokeStyle = "#888888";
    context.font = "11px '宋体'";
    if (type === Ruler.TYPE_VERTICAL) {
      context.moveTo(20, 0);
      context.lineTo(20, height);
      context.moveTo(0, height);
      context.lineTo(20, height);
      let raseY = height;
      let finalY = Math.round(raseY) + 0.5;
      let lineCount = 0;
      while (raseY > 0) {
        if (lineCount % 10 === 0) {
          context.moveTo(width - 1, finalY);
          context.lineTo(3, finalY);
          let text = ((lineCount / 10) * gap).toString();
          for (let i = 0; i < text.length; i++) {
            context.fillText(text[i], 5, raseY + 11 + i * 11);
          }
        } else if (lineCount % 2 === 0) {
          context.moveTo(width - 1, finalY);
          context.lineTo(width - 6, finalY);
        } else {
          context.moveTo(width - 1, finalY);
          context.lineTo(width - 4, finalY);
        }
        raseY -= markGap;
        finalY = Math.round(raseY) + 0.5;
        lineCount++;
      }
    } else {
      context.moveTo(20, height - 20);
      context.lineTo(width, height - 20);
      let raseX = 0;
      let finalX = Math.round(raseX) + 0.5;
      context.moveTo(raseX, height);
      let lineCount = 0;
      while (raseX < width) {
        if (lineCount % 10 === 0) {
          context.moveTo(finalX, height - 1);
          context.lineTo(finalX, 3);
          context.fillText(
            ((lineCount / 10) * gap).toString(),
            raseX + 2,
            11
          );
        } else if (lineCount % 2 === 0) {
          context.moveTo(finalX, height - 1);
          context.lineTo(finalX, height - 6);
        } else {
          context.moveTo(finalX, height - 1);
          context.lineTo(finalX, this.canvas.height - 4);
        }
        raseX += markGap;
        finalX = Math.round(raseX) + 0.5;
        lineCount++;
      }
    }
    context.stroke();
  }

  render() {
    // console.log(this.props);
    const width = this.props.width;
    const height = this.props.height;
    return (
      <div className="Ruler" style={{ height: height, width: width }}>
        <canvas ref={this.canvas} height={height} width={width} />
      </div>
    );
  }
}

export default Ruler;
