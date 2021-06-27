import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Tabs, Divider } from 'antd';
import Icons from '@common/icons';
import NodeTrew from './treeview';
import Tab from '../common/tab';

class Hierarchy extends React.PureComponent {
  render() {
    return (
      <>
        <Tab name="层级管理器" icon={Icons.hierarchy}>
          <NodeTrew />
        </Tab>
      </>
    );
  }
}

export default Hierarchy;
