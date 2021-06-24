import React from 'react';
import PropTypes from 'prop-types';
import { EditorMargin } from '@common/config';

class Grid extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    const { gap, scale } = this.props;
    const canvas = this.canvas.current;
    canvas.style.backgroundColor = 'rgba(0,0,0,0.2)';
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const valueGap = gap * scale;
    const markGap = valueGap / 5;
    this.drawGrid(context, markGap, 'rgba(68,68,68,0.2)');
    this.drawGrid(context, valueGap, 'rgba(68,68,68,0.5)');
  }

  drawGrid(context, gap, colorStyle) {
    const { width, height } = this.props;
    context.beginPath();
    let raseX = EditorMargin;
    let finalX = Math.round(raseX) + 0.5;
    context.moveTo(raseX, height - EditorMargin);
    context.strokeStyle = colorStyle;
    while (raseX < width) {
      context.moveTo(finalX, height - EditorMargin);
      context.lineTo(finalX, 0);
      raseX += gap;
      finalX = Math.round(raseX) + 0.5;
    }
    let raseY = height - EditorMargin;
    let finalY = Math.round(raseY) + 0.5;
    while (raseY > 0) {
      context.moveTo(width, finalY);
      context.lineTo(EditorMargin, finalY);
      raseY -= gap;
      finalY = Math.round(raseY) + 0.5;
    }
    context.stroke();
  }

  render() {
    const { width, height } = this.props;
    const styles = {
      height: 0,
      width: 0,
      // transform: `translate(${0}px, ${-height}px)`,
    };
    return (
      <div className="Grid" style={styles}>
        <canvas ref={this.canvas} height={height} width={width} />
      </div>
    );
  }
}

Grid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
};

export default Grid;
