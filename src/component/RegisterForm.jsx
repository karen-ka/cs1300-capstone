import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../App.css';


export default class RegisterForm extends React.Component {
    state = {
        toLogin: false,
        username: "",
        password: "",
    };

    handleSubmit = () => {
        // Add in logic for local storage here
        this.setState({
            toLogin:true
        });
    }
    
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        if (this.state.toLogin) {
            return <Redirect to='/login' />
        }
        return (
            <Form
                name="basic"
                onFinish = {this.handleSubmit}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                    onChange={(e) => this.handleChange(e)}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    onChange={(e) => this.handleChange(e)}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                </Form>
        );
    };   
};
