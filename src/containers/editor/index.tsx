import React, { WheelEvent, CSSProperties, MouseEvent } from 'react';
import Point from '@common/Point';
import Scene from './scene';

interface Props {
  dimensions: {
    width: number;
    height: number;
  };
  transform: {
    x: number;
    y: number;
  };
}

interface State {
  scale: number;
  transform: {
    x: number;
    y: number;
  };
}

class Editor extends React.Component<Props, State> {
  centerPoint: Point = new Point(0, 0);

  constructor(props: Props) {
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
  handleScroll = (event: WheelEvent) => {
    var curScale = this.state.scale;
    var delta = event.deltaY;
    delta = delta > 0 ? 1 : -1;
    delta = delta * (curScale / 7);
    var targetScale = curScale - delta;
    targetScale = targetScale < 0.02 ? 0.02 : targetScale;
    this.setState({
      scale: targetScale,
    });
  };

  handleMouseEvent = (event: MouseEvent) => {
    const { buttons } = event;
    if (buttons == 2) {
      // this.centerPoint.x += event.movementX;
      // this.centerPoint.y += event.movementY;
      // this.setState({
      //   transform: `translate(${100}px, ${300}px)`
      // })
      var editor = document.getElementById('editor')!.getBoundingClientRect();
      var scene = document.getElementById('scene')!.getBoundingClientRect();
      // console.log(bodyRect)
      // console.log(canvas_el.left)
      // console.log(event.pageX)
      console.log(scene.bottom)
      this.setState({
        transform: {
          x: scene.left + event.movementX - 204.39773559570312,
          y: scene.top + event.movementY ,
        },
      });
      // console.log(document.getElementById('scene'));
      // console.log(event.pageX);
      // console.log(`translate(${event.pageX-canvas_el.x}px, ${0}px)`)
    }
  };

  render() {
    // console.log(this.props);
    const width = this.props.dimensions.width;
    const height = this.props.dimensions.height;
    if (isNaN(width) || isNaN(height)) {
      return <div />;
    }
    return (
      <div
        id="editor"
        style={{
          height: '100%',
        }}
        onWheel={this.handleScroll}
        onMouseMove={this.handleMouseEvent}
      >
        <Scene transform={this.state.transform}></Scene>
        {/* <Ruler
          scale={this.state.scale}
          gap={gap}
          width={20}
          height={height - 20}
          type={Ruler.TYPE_VERTICAL}
        ></Ruler>
        <div>
          <Grid
            gap={gap}
            scale={this.state.scale}
            width={width - 20}
            height={height - 20}
          ></Grid>
          <Ruler
            gap={gap}
            scale={this.state.scale}
            width={width - 20}
            height={20}
            type={Ruler.TYPE_HORIZONTAL}
          ></Ruler>
        </div> */}
      </div>
    );
  }
}

export default Editor;
