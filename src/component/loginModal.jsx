import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.loginModal = React.createRef();
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
    this.setState({modalText: 'Logging you in...', loading: true});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  handleError = () => {
        setTimeout(() => {
            this.setState({
                modalText: "Username/Password doesn't match or doesn't exist. Try again.",
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
            // this means that if the user is in the search page or the game page, reload the page (there's weird router issues otherwise)
            if (document.location.pathname === '/search' || document.location.pathname.includes('/game')) {
              window.location.reload();
            } else {
              this.setState({
                profileRedirect: true
              })
            }
        }, 3000);
  };

  render() {
    // Redirect to profile page after logging in for every other page (except for the search page)
    // Current just does to search
    if (this.state.profileRedirect) {
        return <Redirect to='/search' />
    };
    return (
      <Modal
        title="Log In"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
            <Button type="primary" form="loginForm" key="submit" htmlType="submit" onClick={this.handleOk} loading={this.state.loading}>
                Log In
            </Button>
        ]}
      >
        <LoginForm id="submit-form" handleSuccess={this.handleSuccess} handleError={this.handleError}></LoginForm>
        <p>{this.state.modalText}</p>
      </Modal>
    );
  }
}