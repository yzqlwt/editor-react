import React, { WheelEvent, CSSProperties, MouseEvent } from 'react';
import Point from '@common/Point';
import PropTypes from 'prop-types';
import { EditorMargin } from '@common/config';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    const { width, height, scale } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#AAAAAA"; 　
    context.fillRect(EditorMargin,height-EditorMargin-680*scale,1440*scale+EditorMargin,680*scale);
  }

  render() {
    const { width, height } = this.props;
    return (
      <div id="Scene" style={{ height: 0, width: 0 }}>
        <canvas ref={this.canvas} height={height} width={width} />
      </div>
    );
  }
}

Scene.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

export default Scene;
