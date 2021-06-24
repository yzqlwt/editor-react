import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import Input from './input';

class Index extends React.PureComponent {
  render() {
    const { tip, label, x, y } = this.props;
    return (
      <>
        <div className="ins-prop">
          <div className="prop-name">
            <Tooltip title={tip !== undefined ? tip : label}>
              <span className="label">{label}</span>
            </Tooltip>
          </div>
          <div className="prop-content">
            <span className="label">X</span>
            <Input value={x} type="float" />
            <span className="label">Y</span>
            <Input value={y} type="float" />
          </div>
        </div>
      </>
    );
  }
}

Index.defaultProps = {
  x: 0,
  y: 0,
  tip: undefined,
};

Index.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  tip: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Index;
