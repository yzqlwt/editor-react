import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className="tab-bar">
        <div style={{ height: 3 }}></div>
        <div className="inner">
          <div className="title">
            <div id="icon">
              <img
                src={this.props.icon}
                draggable="false"
              />
            </div>
            <span id="name">{this.props.name}</span>
          </div>
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Tab;
