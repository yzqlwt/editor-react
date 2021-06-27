import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.PureComponent {
  render() {
    // console.error(this.props);
    const { children, icon, name } = this.props;
    return (
      <>
        <div className="tab-bar">
          <div className="inner">
            <div className="title">
              <div id="icon">
                <img src={icon} draggable="false" alt="" />
              </div>
              <span id="name">{name}</span>
            </div>
          </div>
        </div>
        <div className="content">{children}</div>
      </>
    );
  }
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tab;
