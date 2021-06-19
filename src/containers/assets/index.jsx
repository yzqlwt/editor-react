import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Tabs, Divider } from 'antd';
import Icons from '@common/icons';
import Tab from '../common/tab';
import Content from '../common/content';
class Assets extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tab name="资源管理器" icon={Icons.assets}></Tab>
        <div className="content">
        </div>
      </React.Fragment>
    );
  }
}

Assets.defaultProps = {
  dimensions: {},
};

Assets.propTypes = {
  dimensions: PropTypes.objectOf(PropTypes.any),
};

export default Assets;
