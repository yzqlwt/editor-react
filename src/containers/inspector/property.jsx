import React from 'react';
import { Tooltip } from 'antd';
import { find, map } from 'loadsh';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './input';
import styles from './property.css';

class Property extends React.PureComponent {
  renderContent = (data) => {
    if (typeof data === 'object') {
      return map(data, (value, key) => {
        return (
          <>
            <span>{key.toUpperCase()}</span>
            <Input value={value} type="float" />
          </>
        );
      });
    }
    return <Input value={data} type="float" />;
  };

  render() {
    const { tooltip, prop, tree } = this.props;
    const { selected, data } = tree;
    const node = find(data, { id: selected[0] });
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.prop_name}>
            <Tooltip title={tooltip}>
              <span className={styles.label}>
                {prop.replace(/^\S/, (s) => s.toUpperCase())}
              </span>
            </Tooltip>
          </div>
          <div className={styles.prop_content}>
            {this.renderContent(node[prop])}
          </div>
        </div>
      </>
    );
  }
}

Property.propTypes = {
  tooltip: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  tree: PropTypes.any.isRequired,
};

function stateToProps(state) {
  const { tree } = state;
  return { tree };
}

export default connect(stateToProps)(Property);
