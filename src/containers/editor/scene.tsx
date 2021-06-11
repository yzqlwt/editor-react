import React, { WheelEvent, CSSProperties, MouseEvent } from 'react';
import Point from '@common/Point';

interface Props {
  transform:{
    x: number;
    y: number;
  }
}

interface State {
  scale: number;
}

class Scene extends React.Component<Props, State> {
  centerPoint: Point = new Point(0, 0);

  constructor(props: Props) {
    super(props);
    this.state = {
      scale: 1,
    };
  }
  componentDidMount() {
    console.log(document.getElementById('scene'))
    console.log(this)
  }

  render() {
    // console.log(this.props);
    return (
      <div
        id="scene"
        style={{
          height: '100%',
          backgroundColor: "#99CCCC",
          transform: `translate(${this.props.transform.x}px, ${this.props.transform.y}px)`
        }}
      >
      </div>
    );
  }
}

export default Scene;
