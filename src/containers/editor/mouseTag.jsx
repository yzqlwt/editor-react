import React from 'react';
import PropTypes from 'prop-types';
import { EditorMargin } from '@common/config';

class MouseTag extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    const { width, height, scale } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
  }

  handleMouseEvent = (event) => {
    const { buttons } = event;
    console.log("butons")

    // if (buttons === 0) {
    // }
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
