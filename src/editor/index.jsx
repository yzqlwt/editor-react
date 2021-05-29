import React from "react";
import Grid from "./grid";
import Ruler from "./ruler";

const style = {
  display: "flex",
  flexDirection: "row",
};

class Editor extends React.Component {
  state = {
    scale: 1,
  };

  constructor() {
    super();
    this.canvas = React.createRef();
  }

  handleScroll(event) {
    var curScale = this.state.scale;
    var delta = event.deltaY;
    if (delta > 0) {
      delta = 1;
    } else if (delta < 0) {
      delta = -1;
    }
    delta = delta * (curScale / 7);
    var targetScale = curScale - delta;
    if (targetScale < 0.02) {
      targetScale = 0.02;
    }
    this.setState({
      scale: targetScale,
    });
  }

  getGap() {
    const scale = this.state.scale;
    var _minMarkRange = [1, 2, 5]
		var rise= 1;
		var tmpNum;
		var tmpLength;
		var index = 0;
		b: while (true) {
			index = 0;
			while (index < _minMarkRange.length) {
				tmpNum = this.validNumber(_minMarkRange[index] * rise, rise);
				tmpLength = this.validNumber(tmpNum * scale, tmpNum);
				if (tmpLength >= 50)
					break b;
				index++;
			}
			rise *= 10;
			// 避免某些情况下的无限循环
			if (rise > 1000) {
				break;
			}
    }
    return Math.round(tmpNum);
  }

  validNumber(value, defaultValue) {
		if (typeof value === 'undefined') {
			return defaultValue;
		}
		if (value === null) {
			return defaultValue;
		}
		if (Number.isFinite(value)) {
			return value;
		}
		return defaultValue;
	}

  render() {
    console.log(this.props);
    const width = this.props.dimensions.width;
    const height = this.props.dimensions.height;
    if (isNaN(width) || isNaN(height)) {
      return (<div/>);
    }
    const gap = this.getGap();
    return (
      <div style={style} onWheel={(e) => this.handleScroll(e)}>
        <Ruler
          scale={this.state.scale}
          gap={gap}
          width={20}
          height={height-20}
          type={Ruler.TYPE_VERTICAL}>
        </Ruler>
        <div>
          <Grid
            gap={gap}
            scale={this.state.scale}
            width={width - 20}
            height={height - 20}>
          </Grid>
          <Ruler
            gap={gap}
            scale={this.state.scale}
            width={width - 20}
            height={20}
            type={Ruler.TYPE_HORIZONTAL}
          ></Ruler>
        </div>
      </div>
    );
  }
}

export default Editor;
