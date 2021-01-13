import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Alert } from 'antd';
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom';
import logo from '../img/logo.png';

export default class RegisterModal extends React.Component {
  constructor (props) {
    super(props);
    this.registerModal = React.createRef();
    this.state = {
      visible: false,
      loading: false,
      modalText: <></>,
      profileRedirect: false,
      maskClosable: true,
      closable: true,
    };
  }

  showModal = () => {
    this.setState({ visible: true })
  };

  afterClose = () => {
    this.setState({ modalText: <></>, })
  }

  handleOk = () => {
    this.setState({ loading: true, maskClosable: false, closable: false });
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
        maskClosable: true,
        closable: true,
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
        destroyOnClose={true}
        maskClosable={this.state.maskClosable}
        closable={this.state.closable}
        afterClose={this.afterClose}
      >

        <div style={{ width: '100%', textAlign: 'center', marginBottom: '24px' }}>
          <img src={logo}></img>
        </div>

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