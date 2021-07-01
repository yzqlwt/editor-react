import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as fse from 'fs-extra';
import styles from './tree.css';
import Icon from '../ui-kit/ui-icon';

class Tree extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  getList() {
    const topicPath = 'C:/Users/yzqlwt/Documents/skin01/topic1.json';
    const topic = fse.readJSONSync(topicPath);
    return topic.map((node) => {
      console.log(node);
      const style = {
        paddingRight: 10,
        paddingLeft: 15 * node._level + 20,
      };
      return (
        <li className={styles.item} style={style}>
          {/* <i className="fa fa-unlock" title="解锁 / 锁定节点"></i>
          <i className="icon-play"></i> */}
          <Icon value='lock'></Icon>
          <Icon value='play'></Icon>
          <span>{node._name}</span>
        </li>
      );
    });
  }
  render() {
    const list = this.getList();
    return (
      <>
        <ul style={{ height: 200 }}>{list}</ul>
      </>
    );
  }
}

Tree.propTypes = {
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.objectOf(PropTypes.object).isRequired,
};

function stateToProps(state) {
  const { path } = state;
  return { path };
}

export default connect(stateToProps)(Tree);
