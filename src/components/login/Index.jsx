import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined, CodepenOutlined } from '@ant-design/icons';
import * as fse from 'fs-extra';
import auth from '../../common/auth';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const value = auth.isValidToken();
    if (value === 1) {
      this.redirectToIndex();
    } else if (value === 0) {
      setTimeout(() => {
        this.redirectToIndex();
      }, 1000);
    }
  }

  handleSubmitFail = (error) => {
    this.setState({
      errorMessage: error.message,
    });
  };

  redirectToIndex = () => {
    const { dispatch } = this.props;
    const item = window.localStorage.getItem('workspace');
    if (fse.pathExistsSync(item)) {
      this.props.history.push('/app');
      dispatch({
        type: 'workspace',
        workspace: item,
      });
    } else {
      this.props.history.push('/skin');
    }
    console.log('跳转');
  };

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    this.setState({
      errorMessage: null,
    });
    auth
      .login(values.mobile, values.password, values.nonce)
      .then(this.redirectToIndex)
      .catch(this.handleSubmitFail);
  };

  render() {
    return (
      <div
        className="login-page"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div
          className="login-form-wrapper"
          style={{
            width: 300,
            padding: 20,
            backgroundColor: '#F5F5F5',
            marginTop: 100,
          }}
        >
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: 'Please input your mobile!!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Mobile"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="nonce"
              rules={[
                {
                  required: true,
                  message: 'Please input your auth code!',
                },
              ]}
            >
              <Input
                addonBefore={
                  <Form.Item name="prefix" noStyle>
                    <CodepenOutlined />
                    <span> Auth Code </span>
                  </Form.Item>
                }
              />
            </Form.Item>
            <Form.Item>
              {this.state.errorMessage && (
                <Alert
                  message={this.state.errorMessage}
                  type="error"
                  showIcon
                />
              )}
              <Button
                loading={this.state.inFlight}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function stateToProps() {
  return {};
}

export default withRouter(connect(stateToProps)(Index));
