import React from "react";

class Grid extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    const gap = this.props.gap;
    const scale = this.props.scale;
    const canvas = this.canvas.current;
    canvas.style.backgroundColor = "rgba(0,0,0,0.2)";
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const valueGap = gap * scale;
    const markGap = valueGap / 5;
    this.drawGrid(context, markGap, "rgba(68,68,68,0.2)");
    this.drawGrid(context, valueGap, "rgba(68,68,68,0.5)");
  }

  drawGrid(context, gap, colorStyle) {
    const width = this.props.width;
    const height = this.props.height;
    context.beginPath();
    let raseX = 0;
    let finalX = Math.round(raseX) + 0.5;
    context.moveTo(raseX, height);
    context.strokeStyle = colorStyle;
    while (raseX < width) {
      context.moveTo(finalX, height);
      context.lineTo(finalX, 0);
      raseX += gap;
      finalX = Math.round(raseX) + 0.5;
    }
    let raseY = height;
    let finalY = Math.round(raseY) + 0.5;
    while (raseY > 0) {
      context.moveTo(width, finalY);
      context.lineTo(0, finalY);
      raseY -= gap;
      finalY = Math.round(raseY) + 0.5;
    }
    context.stroke();
  }

  render() {
    const width = this.props.width;
    const height = this.props.height;
    return (
      <div className="Grid" style={{height: height, width: width}}>
        <canvas ref={this.canvas} height={height} width={width} />
      </div>
    );
  }
}

export default Grid;