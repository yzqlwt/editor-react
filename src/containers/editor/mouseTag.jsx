import React from 'react';
import PropTypes from 'prop-types';
import { EditorMargin } from '@common/config';

class MouseTag extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  handleMouseEvent = (event) => {
    const { width, height, scale } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    const rect = canvas.getBoundingClientRect();
    const x = event.pageX - rect.left;
    const y = event.pageY - rect.top;
    context.beginPath();
    context.strokeStyle = '#ff0000';
    context.moveTo(0, y);
    context.lineTo(EditorMargin, y);
    context.moveTo(x, 0);
    context.lineTo(x, EditorMargin);
    context.stroke();
  };

  render() {
    const { width, height } = this.props;
    const styles = {
      height: 0,
      width: 0,
    };
    return (
      <div id="MouseTag" style={styles}>
        <canvas
          ref={this.canvas}
          height={height}
          width={width}
          onMouseMove={this.handleMouseEvent}
        />
      </div>
    );
  }
}

MouseTag.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

export default MouseTag;
