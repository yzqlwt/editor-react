import React from 'react';
import PropTypes from 'prop-types';
import styles from './prop-component.css';

class PropComponent extends React.Component {
  constructor(props) {
    super(props);
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
          <div className={styles.header} onClick={this.handleExpand}>
            <div className={styles.icon} data-expand={expand}>
              <span className="icon-play" />
            </div>
            <span className="name">Node</span>
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
