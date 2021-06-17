import React from 'react';
import PropTypes from 'prop-types';
import { EditorMargin } from '@common/config';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    console.log('componentDidMount');
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.save();
  }

  componentDidUpdate() {
    const { width, height, scale } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    this.drawImages();
  }

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
