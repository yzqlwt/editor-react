import React from 'react';
import PropTypes from 'prop-types';
import { EditorMargin } from '@common/config';

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
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { width, height } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);

    const x = config.position.x - (config.size.width / 2) * config.scale.x;
    const y = config.position.y - (config.size.height / 2) * config.scale.y;
    context.transform(config.scale.x, 0, 0, config.scale.y, x, y);
    context.rotate(
      (config.rotation * Math.PI) / 180,
      config.position.x,
      config.position.y
    );
    context.fillStyle = '#0000FF';
    // 绘制成矩形
    context.fillRect(-2, -2, 4, 4);
    const img = new Image();
    img.src = '../.erb/img/js.png';
    // 当图片准备以后再绘制
    img.onload = () => {
      // 绘制图片,按照图片本身的大小进行加载
      context.drawImage(img, 0, 0, config.size.width, config.size.height);
    };
  }

  // componentDidUpdate() {
  //   const { width, height, scale } = this.props;
  //   const canvas = this.canvas.current;
  //   const context = canvas.getContext('2d');
  //   context.clearRect(0, 0, width, height);
  //   this.drawImages();
  // }

  convertX = (x) => {
    return x + EditorMargin;
  };

  convertY = (x) => {
    return x + EditorMargin;
  };

  drawImages() {
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    const { scale } = this.props;
    const img = new Image();
    img.src = '../.erb/img/webpack.png';
    // 当图片准备以后再绘制
    img.onload = () => {
      // 绘制图片,按照图片本身的大小进行加载
      context.drawImage(img, 0, 0, img.width * scale, img.height * scale);
    };
  }

  render() {
    const { width, height } = this.props;
    const styles = {
      height: 0,
      width: 0,
      pointerEvents: 'none',
      transform: `translate(${EditorMargin}px, ${EditorMargin}px)`,
    };
    return (
      <div id="Scene" style={styles}>
        <canvas ref={this.canvas} height={height} width={width} />
      </div>
    );
  }
}

Scene.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

export default Scene;
