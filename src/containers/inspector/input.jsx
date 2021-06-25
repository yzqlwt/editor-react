import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.css';
import console from 'console';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.upRef = React.createRef();
    this.downRef = React.createRef();
    this.state = {
      value: props.value,
    };
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const newValue = this.parseInput(event.target.value);
      this.setState({
        value: newValue,
      });
    });
    this.inputRef.current.addEventListener('input', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      console.log(event.target.value, this.parseInput(event.target.value));
    });
    this.downRef.current.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.downRef.current.setAttribute('pressed', '');
      this.stepDown();
    });
    this.downRef.current.addEventListener('mouseup', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.downRef.current.removeAttribute('pressed', '');
    });
    this.upRef.current.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.upRef.current.setAttribute('pressed', '');
      this.stepUp();
      this.startHolding(this.stepUp);
    });
    this.upRef.current.addEventListener('mouseup', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.upRef.current.removeAttribute('pressed', '');
    });
  }

  toFixed = (e, t, r) => {
    let l = Math.pow(10, t),
      o = (Math.round(e * l) / l).toFixed(t);
    if (r) {
      let e = new RegExp('0{1,' + r + '}$');
      (o = o.replace(e, '')),
        r >= t && '.' === o[o.length - 1] && (o = o.slice(0, -1));
    }
    return o;
  };

  parseFn = (value) => {
    const { type } = this.props;
    return type === 'init' ? parseInt(value, 10) : parseFloat(value);
  };

  parseInput = (value) => {
    if (value === null) return 0;
    if (typeof value === 'string' && value.trim() === '') return 0;
    let e = this.parseFn(value);
    return (
      isNaN(e)
        ? ((e = this.parseFn(0)), (e = this.parseFn(this.formatValue(e))))
        : (e = this.parseFn(this.formatValue(e))),
      e
    );
  };

  formatValue = (value) => {
    const { type } = this.props;
    return value === null || value === ''
      ? ''
      : 'int' === type
      ? this.toFixed(value, 0)
      : this.toFixed(value, 2);
  };

  stepUp = () => {
    const t = this.parseInput(this.state.value);
    let i = t + 0.1;
    // i = this.clampValue(i);
    this.setState({ value: this.formatValue(i) });
  };

  stepDown = () => {
    const t = this.parseInput(this.state.value);
    let i = t - 0.1;
    // i = this.clampValue(i);
    this.setState({ value: this.formatValue(i) });
  };

  startHolding(target, func) {
    (this._curSpin = target),
      (this._holdingID = setTimeout(() => {
        this._stepingID = setInterval(() => {
          func.apply(this);
        }, 50);
      }, 500));
  }

  stopHolding() {
    clearInterval(this._holdingID),
      (this._holdingID = null),
      clearTimeout(this._stepingID),
      (this._stepingID = null),
      (this._curSpin = null);
  }

  render() {
    const { value } = this.state;
    console.log('render', value);
    const { type } = this.props;
    const isShowControl = type !== 'string';
    return (
      <>
        <div className={styles.wrapper} ref={this.divRef}>
          <input
            defaultValue={value}
            value={value}
            className={styles.input}
            placeholder="-"
            ref={this.inputRef}
          />
          <div className={styles.control}>
            <div className={styles.up} ref={this.upRef}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
              </svg>
            </div>
            <div className={styles.down} ref={this.downRef}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
