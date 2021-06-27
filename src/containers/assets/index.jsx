import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Tabs, Divider } from 'antd';
import Icons from '@common/icons';
import Tab from '../common/tab';
import Content from '../common/content';
class Assets extends React.Component {
  render() {
    return (
      <>
        <Tab name="资源管理器" icon={Icons.assets}>
          <div />
        </Tab>
      </>
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
