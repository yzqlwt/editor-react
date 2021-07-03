import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as fse from 'fs-extra';
import { find, each, indexOf } from 'loadsh';
import styles from './tree.css';
import Icon from '../ui-kit/ui-icon';

class Tree extends React.Component {
  getList() {
    const { tree } = this.props;
    const { data, selected } = tree;
    return data.map((node) => {
      const style = {
        paddingRight: 10,
        paddingLeft: 15 * node.level + 15,
      };
      if (this.isExpand(node.id)) {
        return (
          <div
            tabIndex={-1}
            className={styles.item}
            style={style}
            key={node.id}
            data-selected={indexOf(selected, node.id) >= 0}
            onClick={(event) => {
              this.handleClickItem(event, node.id);
            }}
          >
            <Icon
              value="lock"
              type="lock"
              attr={{
                id: node.id,
              }}
            />
            <Icon
              value="play"
              type="arrow"
              attr={{
                id: node.id,
                isParent: node.children.length !== 0,
                isExpand: node.expand,
              }}
              callback={this.handleClickExpand}
            />
            <span className={styles.name}>{node.name}</span>
          </div>
        );
      }
    });
  }

  isExpand = (id) => {
    const { tree } = this.props;
    const { data } = tree;
    let node = find(data, { id: id });
    let isExpand = true;
    while (node.parent && isExpand) {
      node = find(data, { id: node.parent });
      isExpand = node.expand;
    }
    return isExpand;
  };

  handleClickExpand = (attr) => {
    const { tree, dispatch } = this.props;
    const { data } = tree;
    const id = attr.id;
    let node = find(data, { id: id });
    node.expand = !node.expand;
    dispatch({
      type: 'tree',
      data: data,
    });
  };

  handleClickItem = (event, id) => {
    const { tree, dispatch } = this.props;
    const { selected, data } = tree;
    let newSelected = [id];
    if (event.ctrlKey) {
      newSelected = newSelected.concat(selected);
    }
    dispatch({
      type: 'tree-selected',
      selected: newSelected,
    });
  };

  render() {
    const list = this.getList();
    return (
      <>
        <div style={{ height: 200 }}>{list}</div>
      </>
    );
  }
}

Tree.propTypes = {
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.objectOf(PropTypes.object).isRequired,
};

function stateToProps(state) {
  const { path, tree } = state;
  return { path, tree };
}

export default connect(stateToProps)(Tree);
