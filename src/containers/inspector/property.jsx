import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import styles from './property.css';

class Property extends React.PureComponent {
  render() {
    const { label, value, tooltip, children } = this.props;
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.prop_name}>
            <Tooltip title={tooltip}>
              <span className={styles.label}>{label}</span>
            </Tooltip>
          </div>
          <div className={styles.prop_content}>{children}</div>
        </div>
      </>
    );
  }
}

Property.defaultProps = {
  value: 0,
};

Property.propTypes = {
  value: PropTypes.number,
  tooltip: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Property;
