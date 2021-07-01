import React from 'react';
import { Form } from 'antd';
import Checkbox from './checkbox';
import PropComponent from './prop-component';
import { Position, Rotation, Scale, Anchor, Size, Opacity } from './props';
import InspectorStyles from './inspector.css';
import InputStyles from './input.css';
import Icon from '../ui-kit/ui-icon';

class Inspactor extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    return (
      <div className={InspectorStyles.inspector}>
        <div className={InspectorStyles.header}>
          <Checkbox />
          <div className={InputStyles.wrapper}>
            <input className={InputStyles.input} />
          </div>
        </div>
        <PropComponent>
          <Form ref={this.formRef}>
            <Form.Item name="position">
              <Position />
            </Form.Item>
            <Form.Item name="rotation">
              <Rotation />
            </Form.Item>
            <Form.Item name="scale">
              <Scale />
            </Form.Item>
            <Form.Item name="anchor">
              <Anchor />
            </Form.Item>
            <Form.Item name="size">
              <Size />
            </Form.Item>
            <Form.Item name="opacity">
              <Opacity />
            </Form.Item>
          </Form>
        </PropComponent>
      </div>
    );
  }
}

export default Inspactor;
