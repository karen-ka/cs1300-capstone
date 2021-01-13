import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

export default class LoginForm extends React.Component {

  constructor (props) {
    super(props);
    this.loginModal = React.createRef();
    this.state = {
      loading: false,
    };
  }

  setLoading = () => {
    this.setState({ loading: true });
  }

  unsetLoading = () => {
    this.setState({ loading: false });
  }

  onFinish = values => {
    this.setLoading();
    this.props.handleOk();
    const username = values['username'];
    const password = values['password'];
    // replace with mongo call
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch('/login', requestOptions)
      .then((response) => {
        if (response.status === 200) {
          this.props.handleSuccess(username);
        } else {
          this.props.handleError();
        };
      });
  };

  onFinishFailed = () => {
    console.log('failed')
  }

  render() {
    return (
      <Form
        preserve={false}
        id="loginForm"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        style={{ width: '70%', margin: 'auto' }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: '100%', }} type="primary" form="loginForm" key="submit" htmlType="submit" loading={this.state.loading}>
            Log In
            </Button>
        </Form.Item>
      </Form>
    );
  }
}
