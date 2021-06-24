import React from 'react';
import PropTypes from 'prop-types';
import * as spritejs from 'spritejs';
import { EditorMargin } from '@common/config';
const { Sprite } = spritejs;

const config = {
  size: {
    width: 100,
    height: 100,
  },
  position: {
    x: 100,
    y: 300,
  },
  scale: {
    x: 1.0,
    y: 1.0,
  },
  anchor: {
    x: 0.5,
    y: 0.5,
  },
  rotation: 45,
  opacity: 255,
};

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.sceneRef = React.createRef();
    this.scene = {};
  }

  componentDidMount() {
    const container = this.sceneRef.current;
    const { width, height, scale } = this.props;
    const scene = new spritejs.Scene({
      container,
      width: width,
      height: height,
      mode: 'stickyTop',
    });
    this.scene = scene;
  }

  componentDidUpdate() {
    console.error('componentDidMount');
    const { width, height, scale } = this.props;
    const container = this.sceneRef.current;
    const scene = this.scene;
    let layer = scene.layer();
    layer.remove();
    layer = scene.layer();
    const robot = new Sprite('../.erb/img/js.png');

    robot.attr({
      anchor: [0.5, 1 - 0.5],
      pos: [0, height - 0],
      scale: [scale, scale],
      transformOrigin:[50, 50],
      rotate: 90,
    });
    layer.append(robot);
  }

  // componentDidUpdate() {
  //   // const { width, height, scale } = this.props;
  //   // const canvas = this.canvas.current;
  //   // const context = canvas.getContext('2d');
  //   // context.clearRect(0, 0, width, height);
  //   // this.drawImages();
  // }

  render() {
    const { width, height } = this.props;
    const styles = {
      height: height,
      width: width,
      // pointerEvents: 'none',
      transform: `translate(${EditorMargin}px, ${0}px)`,
    };
    return <div id="Scene" ref={this.sceneRef} style={styles}></div>;
  }
}

Scene.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

export default Scene;
