import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Tabs, Divider } from 'antd';
import Icons from '@common/icons';
import Tab from '../common/tab';
import Content from '../common/content';
class NodeLibrary extends React.Component {
  render() {
    return (
      <>
        <Tab name="ui库" icon={Icons.library}>
          <div />
        </Tab>
      </>
    );
  }
}

NodeLibrary.defaultProps = {
  dimensions: {},
};

NodeLibrary.propTypes = {
  dimensions: PropTypes.objectOf(PropTypes.any),
};

export default NodeLibrary;
