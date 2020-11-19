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
      visible: false,
      confirmLoading: false,
      modalText: '',
      profileRedirect: false
    };
  }

  showModal = () => {
    this.setState({visible: true})
  };

  handleOk = () => {
    this.setState({modalText: 'Registering you...', confirmLoading: true});
  };

  handleCancel = () => {
    this.setState({visible: false});
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

  handleSuccess = (username) => {
        setTimeout(() => {
            this.setState({
                modalText: "Success! Logging you in!",
                visible: true, 
                confirmLoading:false
            });
        }, 2000);
        // redirect to user page after a few seconds
        setTimeout(() => {
            this.setState({
                profileRedirect: true
            });
            localStorage.setItem('currentUser', username);
        }, 3000);
  };

  render() {
    // if an user is already logged in, redirect them to profile page
    if (localStorage.getItem("currentUser") || this.state.profileRedirect) {
        return <Redirect to='/user_profile' />
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