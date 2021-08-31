import React, { createContext } from 'react';
import { Form } from 'antd';
import { find } from 'loadsh';
import { connect } from 'react-redux';
import Checkbox from './checkbox';
import PropComponent from './prop-component';
import Property from './property';
import { Position, Rotation, Scale, Anchor, Size, Opacity } from './props';
import InspectorStyles from './inspector.css';
import InputStyles from './input.css';
import Icon from '../ui-kit/ui-icon';

class Inspactor extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    // this.formRef.current.setFieldsValue({
    //   position: [1, 1],
    // });
  }

  render() {
    const { tree, dispatch } = this.props;
    const { selected, data } = tree;
    if (selected.length !== 1) {
      return null;
    }
    let node = find(data, { id: selected[0] });
    return (
      <div className={InspectorStyles.inspector}>
        <div className={InspectorStyles.header}>
          <Checkbox />
          <div className={InputStyles.wrapper}>
            <input className={InputStyles.input} value={node.name} />
          </div>
        </div>
        <PropComponent>
          <Property
            key="position"
            prop="position"
            tooltip="相对父节点的位置坐标，以像素为单位"
          />
          <Property
            key="rotation"
            prop="rotation"
            tooltip="相对父节点的旋转，以度为单位，输入正值时逆时针旋转"
          />
        </PropComponent>
      </div>
    );
  }
}

function stateToProps(state) {
  const { path, tree } = state;
  return { path, tree };
}

export default connect(stateToProps)(Inspactor);
