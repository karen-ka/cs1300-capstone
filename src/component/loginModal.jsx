import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import LoginForm from './LoginForm';

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.loginModal = React.createRef();
    // this.setState
    this.state = {
      visible: false,
      confirmLoading: false,
      modalText: ''
    };
  }

  showModal = () => {
    this.setState({visible: true})
  };

  handleOk = () => {
    this.setState({modalText: 'Logging you in...', confirmLoading: true})
    setTimeout(() => {
      this.setState({visible: false, confirmLoading: false})
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({visible: false})
  };

  render() {
    return (
      <>

      <Modal
        title="Title"
        visible={this.state.visible}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
      >
        <LoginForm></LoginForm>
        {/* <p>{this.state.modalText}</p> */}
      </Modal>
    </>
    );
  }
}