import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icons from '@common/icons';
import NodeTrew from './treeview';
import Tab from '../common/tab';
import Tree from './tree';

class Hierarchy extends React.PureComponent {
  render() {
    return (
      <>
        <Tab name="层级管理器" icon={Icons.hierarchy}>
          <Tree />
        </Tab>
      </>
    );
  }
}

function stateToProps(state) {
  const { path } = state;
  return { path };
}

export default connect(stateToProps)(Hierarchy);
