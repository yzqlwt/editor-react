import React from 'react';
import PropTypes from 'prop-types';
import styles from './checkbox.css';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.checkboxRef = React.createRef();
    this.state = {
      checked: false,
    };
  }
  componentDidMount() {
    this.checkboxRef.current.setAttribute('checked', '');
  }
  handleCheck = (event) => {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
  };

  render() {
    return (
      <>
        <div
          className={styles.box}
          ref={this.checkboxRef}
          onClick={this.handleCheck}
        >
          {this.state.checked && <i className={styles.checker}></i>}
        </div>
        <div className={styles.slot} />
      </>
    );
  }
}

CheckBox.propTypes = {
  // value: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
};

export default CheckBox;
