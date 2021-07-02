import React from 'react';
import PropTypes from 'prop-types';
import { each } from 'loadsh';
import styles from './ui-icon.css';

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
  }

  componentDidMount() {
    const { attr } = this.props;
    each(attr || {}, (value, key) => {
      this.rootRef.current.setAttribute(key, value);
    });
  }

  componentDidUpdate() {
    const { attr } = this.props;
    each(attr || {}, (value, key) => {
      this.rootRef.current.setAttribute(key, value);
    });
  }

  render() {
    const { value, type, callback, attr } = this.props;
    return (
      <div
        className={styles[type]}
        ref={this.rootRef}
        onClick={(event) => {
          event.stopPropagation();
          callback(attr);
        }}
      >
        <div className="icon">
          <span className={`icon-${value}`} />
        </div>
      </div>
    );
  }
}

Icon.propTypes = {
  value: PropTypes.string.isRequired,
  attr: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

Icon.defaultProps = {
  callback: () => {
    console.log('callback');
  },
};

export default Icon;
