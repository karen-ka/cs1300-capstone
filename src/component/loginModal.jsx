import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Alert } from 'antd';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';

export default class LoginModal extends React.Component {
  constructor (props) {
    super(props);
    this.loginModal = React.createRef();
    this.state = {
      visible: false,
      loading: false,
      modalText: <></>,
      profileRedirect: false
    };

    if (this.props.onUserPage) {
      this.setState({ visible: true });
    }
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
          message="Incorrect email or password"
          // description="Please go to login page or try again with a different username."
          type="error"
          showIcon
        /><br /></>,
        // modalText: "Username/Password doesn't match or doesn't exist. Please try again or sign up for an account.",
        visible: true,
        loading: false
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
      // this means that if the user is in the search page or the game page, reload the page (there's weird router issues otherwise)
      if (document.location.pathname === '/search' || document.location.pathname.includes("/game")) {
        window.location.reload();
      } else {
        this.setState({
          profileRedirect: true
        })
      }
    }, 3000);
  };

  render() {
    const modalProps = this.props.onUserPage ? { maskClosable: false, closable: false } : {};
    // Redirect to profile page after logging in for every other page (except for the search page)
    // Current just does to search

    console.log(this.props)
    if (this.state.profileRedirect) {
      return <Redirect to={{
        pathname: '/user',
        state: { fromLogin: true }
      }}
      />
    };
    return (
      <Modal
        title="Log In"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <></>
        ]}
        {...modalProps}
      >
        <p>{this.state.modalText}</p>

        <LoginForm id="submit-form" handleSuccess={this.handleSuccess} handleError={this.handleError}></LoginForm>


        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button style={{ width: '70%' }} type="primary" form="loginForm" key="submit" htmlType="submit" onClick={this.handleOk} loading={this.state.loading}>
            Log In
            </Button>
        </div>

      </Modal>
    );
  }
}