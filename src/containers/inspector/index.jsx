import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Tabs, Divider } from 'antd';
import Icons from '@common/icons';
import Tab from '../common/tab';
import Inspector from './inspector';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Tab name="属性管理器" icon={Icons.inspector} />
        <div className="content">
          <Inspector />
        </div>
      </>
    );
  }
}

Index.defaultProps = {
  dimensions: {},
};

Index.propTypes = {
  dimensions: PropTypes.objectOf(PropTypes.any),
};

export default Index;
