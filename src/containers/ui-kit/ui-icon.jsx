import React from 'react';
import PropTypes from 'prop-types';
import styles from './ui-icon.css';

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
  }

  setAttribute = (attr, value) => {
    this.rootRef.current.setAttribute(attr, value);
  };

  removeAttribute = (attr) => {
    this.rootRef.current.removeAttribute(attr);
  };

  componentDidUpdate() {
    console.log('componentDidUpdate', this.props);
    const { attr, attrValue } = this.props;
    this.rootRef.current.setAttribute(attr, attrValue);
  }

  render() {
    const { value } = this.props;
    return (
      <div className={styles.fold} ref={this.rootRef}>
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
  attrValue: PropTypes.string.isRequired,
};

export default Icon;
