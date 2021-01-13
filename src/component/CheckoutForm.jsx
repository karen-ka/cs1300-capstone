import React from 'react';
import { Form, Input, Button, Checkbox, DatePicker } from 'antd';
import NumericInput from './NumericInput.jsx'
import moment from 'moment';

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

  // can't select previous months for cvv
  disabledDate = (current) => {
    return current < moment().subtract(1, 'months');
  }


  render() {
    const validateMessages = {
      required: '${label} is required',
      types: {
        email: '${label} is not a valid email',
        number: '${label} is not a valid number!',
      },
    };

    return (
      <Form
        {...layout}
        id="checkoutform"
        name="checkoutform"
        className="checkoutform"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        style={{ minWidth: '300px' }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="Card number"
          label="Card number"
          rules={[{ required: true, }]}
        >
          <NumericInput style={{ width: '60%' }} length={16} placeholder="Card number"></NumericInput>
        </Form.Item>
        <Form.Item
          name="Expiry date"
          label="Expiry date"
          rules={[{ required: true, }]}
        >
          <DatePicker picker="month" placeholder="Expiry date" disabledDate={this.disabledDate} />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="CVV"
          rules={[{ required: true, }]}
        >
          <NumericInput style={{ width: '20%' }} length={4} placeholder="CVV"></NumericInput>
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input style={{ width: '60%' }} length={4} placeholder="Email"></Input>
        </Form.Item>


        <Form.Item {...tailLayout}>
          <br />
          <Button style={{ width: '40%' }} type="primary" htmlType="submit" loading={this.props.loading}>
            Submit
        </Button>
        </Form.Item>
      </Form>
    );
  }
}
