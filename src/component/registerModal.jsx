import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Alert } from 'antd';
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom';

export default class RegisterModal extends React.Component {
  constructor (props) {
    super(props);
    this.registerModal = React.createRef();
    this.state = {
      visible: false,
      loading: false,
      modalText: <></>,
      profileRedirect: false,
      showAlert: false
    };
  }

  showModal = () => {
    this.setState({ visible: true })
  };

  handleOk = () => {
    this.setState({ loading: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleError = () => {
    setTimeout(() => {
      this.setState({
        modalText: <>< Alert
          style={{ width: '70%', margin: 'auto' }}
          message="Username already exists"
          // description="Please go to login page or try again with a different username."
          type="warning"
          showIcon
        /><br /></>,
        visible: true,
        loading: false,
        showAlert: true,
      });
    }, 3000);
  };

  handleSuccess = (username) => {
    setTimeout(() => {
      this.setState({
        // modalText: "Success! Logging you in!",
        visible: true,
        loading: false
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
        title="Sign Up"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <></>
        ]}
      >

        {this.state.modalText}

        <RegisterForm id="submit-form" handleSuccess={this.handleSuccess} handleError={this.handleError}></RegisterForm>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button style={{ width: '70%', margin: 'auto' }} type="primary" form="registerForm" key="submit" htmlType="submit" onClick={this.handleOk} loading={this.state.loading}>
            Sign Up
            </Button>
        </div>

      </Modal>
    );
  }
}