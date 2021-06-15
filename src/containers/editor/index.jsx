import React, { WheelEvent, CSSProperties, MouseEvent } from 'react';
import Point from '@common/Point';
import Scene from './scene';
import Ruler from './ruler';
import Grid from './grid';
import { calcMinMark } from '@common/utils';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      transform: {
        x: 0,
        y: 0,
      },
    };
  }

  /**
   *处理鼠标滚轮事件
   *计算editor当前的缩放值
   * @param {WheelEvent} event
   * @memberof Editor
   */
  handleScroll = (event) => {
    var curScale = this.state.scale;
    var delta = event.deltaY;
    delta = delta > 0 ? 1 : -1;
    delta = delta * (curScale / 7);
    var targetScale = curScale - delta;
    targetScale = targetScale < 0.2 ? 0.2 : targetScale;
    targetScale = targetScale > 100 ? 100 : targetScale;
    this.setState({
      scale: targetScale,
    });
  };

  handleMouseEvent = (event) => {
    const { buttons } = event;
    if (buttons == 2) {
      // this.centerPoint.x += event.movementX;
      // this.centerPoint.y += event.movementY;
      // this.setState({
      //   transform: `translate(${100}px, ${300}px)`
      // })
      var editor = document.getElementById('editor').getBoundingClientRect();
      var scene = document.getElementById('scene').getBoundingClientRect();
      // console.log(bodyRect)
      // console.log(canvas_el.left)
      // console.log(event.pageX)
      console.log(scene.bottom);
      this.setState({
        transform: {
          x: scene.left + event.movementX - 204.39773559570312,
          y: scene.top + event.movementY,
        },
      });
      // console.log(document.getElementById('scene'));
      // console.log(event.pageX);
      // console.log(`translate(${event.pageX-canvas_el.x}px, ${0}px)`)
    }
  };

  render() {
    const width = this.props.dimensions.width;
    const height = this.props.dimensions.height;
    if (isNaN(width) || isNaN(height)) {
      return null;
    }
    console.log(width);
    const { scale } = this.state;
    const gap = calcMinMark(scale);
    return (
      <div
        id="editor"
        style={{
          height: '100%',
        }}
        onWheel={this.handleScroll}
        onMouseMove={this.handleMouseEvent}
      >
        <Scene scale={scale} gap={gap} width={width} height={height}></Scene>
        <Ruler scale={scale} gap={gap} width={width} height={height}></Ruler>
        <Grid scale={scale} gap={gap} width={width} height={height}></Grid>
      </div>
    );
  }
}

export default Editor;
