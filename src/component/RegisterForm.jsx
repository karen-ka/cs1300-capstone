import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

export default class RegisterForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.loginModal = React.createRef();
//   }
//   state = {
//     current: 'mail',
//   };

  onFinish = values => {
    const username = values['username'];
    const password = values['password'];
    // replace with mongo call
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password:password })
    };
    fetch('/register', requestOptions)
    .then((response) => {
        console.log(response);
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
        id="registerForm"
        name="normal_register"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}
      </Form>
    );
  }
}
