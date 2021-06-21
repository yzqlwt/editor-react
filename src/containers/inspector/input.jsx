import React from 'react';
import PropTypes from 'prop-types';
import './input.global.css';

class Input extends React.Component {
  render() {
    return (
      <>
        <div className="label">{this.props.label}</div>
        <div className="ins-input" style={{ width: this.props.width }}>
          <div className="ins-content">
            <input className="input" tabIndex="-1" />
            <div className="unit">
              <span></span>
            </div>
            <div className="control-btns">
              <div className="up">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path>
                  </svg>
                </div>
              </div>
              <div className="down">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
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
  width: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
