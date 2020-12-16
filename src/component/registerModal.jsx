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
      loading: false,
      modalText: '',
      profileRedirect: false
    };
  }

  showModal = () => {
    this.setState({visible: true})
  };

  handleOk = () => {
    this.setState({modalText: 'Registering you...', loading: true});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  handleError = () => {
        setTimeout(() => {
            this.setState({
                modalText: "Username already exists. Please go to login page.",
                visible: true, 
                loading:false
            });
        }, 3000);
  };

  handleSuccess = (username) => {
        setTimeout(() => {
            this.setState({
                modalText: "Success! Logging you in!",
                visible: true, 
                loading:false
            });
        }, 2000);
        // redirect to user page after a few seconds
        setTimeout(() => {
            localStorage.setItem('currentUser', username);
            // this means that if the user is in the search page, reload the page (there's weird router issues otherwise)
            if (document.location.pathname === '/search') {
              window.location.reload();
            } else {
              this.setState({
                profileRedirect: true
              })
            }
        }, 3000);
  };

  render() {
    // Redirect to profile page after logging in
    if (this.state.profileRedirect) {
        return <Redirect to='/search' />
    };

    return (
      <Modal
        title="Register Now"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
            <Button form="registerForm" key="submit" htmlType="submit" onClick={this.handleOk} loading={this.state.loading}>
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