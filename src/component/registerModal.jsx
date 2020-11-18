import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom';

export default class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.registerModal = React.createRef();
    // this.setState
    this.state = {
      visible: true,
      confirmLoading: false,
      modalText: '',
      cancelRedirect: false,
      loginRedirect: false,
    };
  }

  showModal = () => {
    this.setState({visible: true})
  };

  handleOk = () => {
    this.setState({modalText: 'Registering you...', confirmLoading: true});
  };

  handleCancel = () => {
    this.setState({visible: false, cancelRedirect: true});
  };

  handleError = () => {
        setTimeout(() => {
            this.setState({
                modalText: "Username already exists. Please go to login page.",
                visible: true, 
                confirmLoading:false
            });
        }, 3000);
  };

  handleSuccess = () => {
        setTimeout(() => {
            this.setState({
                modalText: "Success! Redirecting you to login page!",
                visible: true, 
                confirmLoading:false
            });
        }, 2000);
        // redirect to login page after a few seconds
        setTimeout(() => {
            this.setState({
                loginRedirect: true
            });
        }, 6000);
  };

  render() {
    // if an user is already logged in, redirect them to profile page
    if (localStorage.getItem("currentUser")) {
        return <Redirect to='/user_profile' />
    }else if (this.state.cancelRedirect) { // if the user cancels the modal, redirect to home.
        return <Redirect to='/home' />
    }else if (this.state.loginRedirect) { // successful registration. redirect to login.
        return <Redirect to='/login' />
    };

    return (
      <Modal
        title="Register Now"
        visible={this.state.visible}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
        footer={[
            <Button form="registerForm" key="submit" htmlType="submit" onClick={this.handleOk}>
                Register
            </Button>
        ]}
      >
        <RegisterForm id="submit-form" handleSuccess={this.handleSuccess} handleError={this.handleError}></RegisterForm>
        <p>{this.state.modalText}</p>
      </Modal>
    );
  }
}