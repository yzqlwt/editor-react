import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import Input from './input';

class Index extends React.PureComponent {
  render() {
    const { label, value } = this.props;
    return (
      <>
        <div className="ins-prop">
          <div className="prop-name">
            <Tooltip title={label}>
              <span className="label">{label}</span>
            </Tooltip>
          </div>
          <div className="prop-content">
            <Input value={value} type="float" />
          </div>
        </div>
      </>
    );
  }
}

Index.defaultProps = {
  value: 0,
};

Index.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
};

export default Index;
