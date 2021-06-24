import React from 'react';
import * as spritejs from 'spritejs';
import PropTypes from 'prop-types';
import { calcMinMark } from '@common/utils';
import { EditorMargin } from '@common/config';
import Scene from './scene';
import Ruler from './ruler';
import Grid from './grid';
import Tab from '../common/tab';
import Icons from '@common/icons';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
    };
  }

  /**
   *处理鼠标滚轮事件
   *计算editor当前的缩放值
   * @param {WheelEvent} event
   * @memberof Editor
   */
  handleScroll = (event) => {
    const { scale } = this.state;
    let delta = event.deltaY;
    delta = delta > 0 ? 1 : -1;
    delta *= scale / 7;
    let targetScale = scale - delta;
    targetScale = targetScale < 0.2 ? 0.2 : targetScale;
    targetScale = targetScale > 100 ? 100 : targetScale;
    this.setState({
      scale: targetScale,
    });
  };



  render() {
    const { dimensions } = this.props;
    const { width, height } = dimensions;
    if (typeof width === 'string' || typeof height === 'string') {
      return null;
    }
    const { scale } = this.state;
    const gap = calcMinMark(scale);
    return (
      <React.Fragment>
        <Tab name="场景编辑器" icon={Icons.scene} />
        <div className="content">
          <div
            id="editor"
            style={{
              height: '100%',
            }}
            onWheel={this.handleScroll}
          >
            <Ruler scale={scale} gap={gap} width={width} height={height - 25} />
            <Grid scale={scale} gap={gap} width={width} height={height - 25} />
            <Scene
              scale={scale}
              width={width - EditorMargin}
              height={height - EditorMargin -25}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Editor.defaultProps = {
  dimensions: {},
};

Editor.propTypes = {
  dimensions: PropTypes.objectOf(PropTypes.any),
};

export default Editor;
