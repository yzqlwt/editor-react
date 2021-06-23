import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Form, Tooltip } from 'antd';
import Input from './input';
import Vec2 from './vec2';
import Vec1 from './vec1';
import Size from './size';
import './index.global.css';

class Properties extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    return (
      <>
        <Form ref={this.formRef}>
          <Form.Item name="visible">
            <div className="ins-bool">
              <div className="ins-prop">
                <div className="prop-content">
                  <Checkbox />
                  <Input value="background" type="string" />
                </div>
              </div>
            </div>
          </Form.Item>
          <Form.Item name="position">
            <Vec2 label="Position" x={0} y={0} />
          </Form.Item>
          <Form.Item name="rotation">
            <Vec1 label="Rotation" value={0} />
          </Form.Item>
          <Form.Item name="scale">
            <Vec2 label="Scale" x={0} y={0} />
          </Form.Item>
          <Form.Item name="anchor">
            <Vec2 label="Anchor" x={0} y={0} />
          </Form.Item>
          <Form.Item name="size">
            <Size label="Size" width={0} height={0} />
          </Form.Item>
          <Form.Item name="opacity">
            <Vec1 label="Opacity" value={0} />
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Properties;
