import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.css';

class Input extends React.PureComponent {
  render() {
    return (
      <>
        <div className={styles.label}>{this.props.label}</div>
        <div className={styles.ins_input}>
          <div className={styles.ins_content}>
            <input className={styles.box} tabIndex="-1" />
            <div className={styles.control_btns}>
              <div className={styles.up}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
                  </svg>
                </div>
              </div>
              <div className={styles.down}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Input;
