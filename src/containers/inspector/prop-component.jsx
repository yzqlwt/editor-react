import React from 'react';
import PropTypes from 'prop-types';
import styles from './prop-component.css';
import Icon from '../ui-kit/ui-icon';

class PropComponent extends React.Component {
  constructor(props) {
    super(props);
    this.iconRef = React.createRef();
    this.state = {
      expand: true,
    };
  }

  handleExpand = (event) => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    const { expand } = this.state;
    const { children } = this.props;
    return (
      <>
        <div className={styles.component}>
          <div
            tabIndex="0"
            role="button"
            className={styles.header}
            onClick={this.handleExpand}
            onKeyDown={() => {}}
          >
            <Icon
              value="play"
              ref={this.iconRef}
              type="fold"
              attr={{
                isExpand: expand,
              }}
            />
            <span className={styles.name}>Node</span>
          </div>
          <div className={styles.line} />
          {expand && <div className={styles.content}>{children}</div>}
        </div>
      </>
    );
  }
}

PropComponent.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PropComponent;
