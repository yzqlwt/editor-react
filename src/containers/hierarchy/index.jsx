import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Tabs, Divider } from 'antd';
import NodeTrew from './treeview';
import Icons from '@common/icons';
import Tab from '../common/tab';
import Content from '../common/content';
class Hierarchy extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tab name="层级管理器" icon={Icons.hierarchy}></Tab>
        <div className="content">
          <NodeTrew></NodeTrew>
        </div>
      </React.Fragment>
    );
  }
}

Hierarchy.defaultProps = {
  dimensions: {},
};

Hierarchy.propTypes = {
  dimensions: PropTypes.objectOf(PropTypes.any),
};

export default Hierarchy;
