import React from 'react';
import PropTypes from 'prop-types';
import { EditorMargin } from '@common/config';

class Ruler extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.spacing = 0;
    this.minSpacing = 0;
  }

  componentDidUpdate() {
    this.drawRuler();
  }

  drawVerticalRuler(context) {
    const { gap, height } = this.props;
    let { width } = this.props;
    width = EditorMargin;
    context.beginPath();
    context.moveTo(EditorMargin, 0);
    context.lineTo(EditorMargin, height);
    let raseY = EditorMargin;
    let finalY = Math.round(raseY) + 0.5;
    let lineCount = 0;
    while (raseY <= height) {
      if (lineCount % 10 === 0) {
        context.moveTo(width - 1, finalY);
        context.lineTo(3, finalY);
        const text = ((lineCount / 10) * gap).toString();
        for (let i = 0; i < text.length; i += 1) {
          context.fillText(text[i], 5, raseY + 11 + i * 11);
        }
      } else if (lineCount % 2 === 0) {
        context.moveTo(width - 1, finalY);
        context.lineTo(width - 6, finalY);
      } else {
        context.moveTo(width - 1, finalY);
        context.lineTo(width - 4, finalY);
      }
      raseY += this.minSpacing;
      finalY = Math.round(raseY) + 0.5;
      lineCount += 1;
    }
    context.stroke();
  }

  drawHorizontalRuler(context) {
    const { gap, width } = this.props;
    let { height } = this.props;
    context.beginPath();
    context.moveTo(0, EditorMargin);
    context.lineTo(width, EditorMargin);
    let raseX = EditorMargin;
    let finalX = Math.round(raseX) + 0.5;
    context.moveTo(raseX, height);
    let lineCount = 0;
    while (raseX < width) {
      if (lineCount % 10 === 0) {
        context.moveTo(finalX, 0);
        context.lineTo(finalX, EditorMargin);
        context.fillText(((lineCount / 10) * gap).toString(), raseX + 2, 12);
      } else if (lineCount % 2 === 0) {
        context.moveTo(finalX, EditorMargin - 1);
        context.lineTo(finalX, EditorMargin - 6);
      } else {
        context.moveTo(finalX, EditorMargin - 1);
        context.lineTo(finalX, EditorMargin - 4);
      }
      raseX += this.minSpacing;
      finalX = Math.round(raseX) + 0.5;
      lineCount += 1;
    }
    context.stroke();
  }

  drawRuler() {
    const { gap, scale, width, height } = this.props;
    this.spacing = gap * scale;
    this.minSpacing = this.spacing / 10;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#888888';
    context.font = "11px 'Helvetica'";
    context.clearRect(0, 0, width, height);
    this.drawHorizontalRuler(context);
    this.drawVerticalRuler(context);
    context.stroke();
  }

  render() {
    const { width, height } = this.props;
    return (
      <div id="Ruler" style={{ height: 0, width: 0 }}>
        <canvas ref={this.canvas} height={height} width={width} />
      </div>
    );
  }
}

Ruler.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

export default Ruler;
