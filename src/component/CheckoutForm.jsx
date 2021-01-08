import React from 'react';
import { Form, Input, Button, Checkbox, DatePicker } from 'antd';
import NumericInput from './NumericInput.jsx'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class CheckoutForm extends React.Component {
  onFinish = (values) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: localStorage.getItem('currentUser'), gameID: this.props.gameID })
    };
    fetch('/addGame', requestOptions)
      .then((response) => {
        if (response.status === 200) {
          this.props.handleSuccess();
        } else {
          this.props.handleError();
        };
      });
  };

  render() {
    return (
      <Form
        {...layout}
        id="checkoutform"
        name="checkoutform"
        className="checkoutform"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="Card number"
          label="Card number"
          rules={[{ required: true, message: 'Please input your card number' }]}
        >
          <NumericInput style={{ width: '60%' }} length={16} placeholder="Card number"></NumericInput>
        </Form.Item>
        <Form.Item
          name="Expiry date"
          label="Expiry date"
          rules={[{ required: true, message: 'Please input the expiry date' }]}
        >
          <DatePicker picker="month" placeholder="Expiry date" />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="CVV"
          rules={[{ required: true, message: 'Please input the CVV' }]}
        >
          <NumericInput style={{ width: '20%' }} length={4} placeholder="CVV"></NumericInput>
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: 'Please input the CVV' }]}
        >
          <Input style={{ width: '60%' }} length={4} placeholder="Email"></Input>
        </Form.Item>


        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={this.props.loading}>
            Submit
        </Button>
        </Form.Item>
      </Form>
    );
  }
}
