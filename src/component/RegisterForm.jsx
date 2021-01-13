import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

export default class RegisterForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onFinish = values => {
    this.setState({ loading: true });
    this.props.handleOk();
    const username = values['username'];
    const password = values['password'];
    // replace with mongo call
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch('/register', requestOptions)
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

  setLoading = () => {
    this.setState({ loading: true });
  }

  unsetLoading = () => {
    this.setState({ loading: false });
  }

  render() {
    return (
      <Form
        id="registerForm"
        name="normal_register"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        style={{ width: '70%', margin: 'auto' }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name.' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username.' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password.' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: '100%', margin: 'auto' }} type="primary" form="registerForm" key="submit" htmlType="submit" loading={this.state.loading}>
            Sign Up
            </Button>
        </Form.Item>

        {/* <Form.Item name="offers">
          <Checkbox>Yes, I would like to receive promotional offers and updates from StartPlaying.Games.</Checkbox>

        </Form.Item> */}
        {/* <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}
      </Form>
    );
  }
}
