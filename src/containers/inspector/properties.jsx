import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Form, Tooltip, InputNumber } from 'antd';
import Input from './input';
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
                <div className="prop-name">
                  <Tooltip title="取消勾选后，对象不可见">
                    <span className="label">Visible</span>
                  </Tooltip>
                </div>
                <div className="prop-content">
                  <Checkbox />
                </div>
              </div>
            </div>
          </Form.Item>
          <Form.Item name="position">
            <div className="ins-prop">
              <div className="prop-name">
                <Tooltip title="Position">
                  <span className="label">Position</span>
                </Tooltip>
              </div>
              <div className="prop-content">
                <Input label="X" />
                <Input label="Y" />
              </div>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Properties;
