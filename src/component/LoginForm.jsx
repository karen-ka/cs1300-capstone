import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

export default class LoginForm extends React.Component {

  onFinish = values => {
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

  render() {
    return (
      <Form
        id="loginForm"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
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
      </Form>
    );
  }
}
