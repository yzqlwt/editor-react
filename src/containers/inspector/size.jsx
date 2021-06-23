import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import Input from './input';

class Index extends React.PureComponent {
  render() {
    const { label, width, height } = this.props;
    return (
      <>
        <div className="ins-prop">
          <div className="prop-name">
            <Tooltip title={label}>
              <span className="label">{label}</span>
            </Tooltip>
          </div>
          <div className="prop-content">
            <span className="label">W</span>
            <Input label="X" value={width} type="float" />
            <span className="label">H</span>
            <Input label="Y" value={height} type="float" />
          </div>
        </div>
      </>
    );
  }
}

Index.defaultProps = {
  width: 0,
  height: 0,
};

Index.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string.isRequired,
};

export default Index;
