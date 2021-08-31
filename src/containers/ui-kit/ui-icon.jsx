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
        tabIndex="0"
        className={styles[type]}
        ref={this.rootRef}
        role="button"
        onKeyDown={() => {}}
        onClick={(event) => {
          if (callback) {
            event.stopPropagation();
            callback(attr);
          }
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
  attr: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

Icon.defaultProps = {
  callback: null,
};

export default Icon;
