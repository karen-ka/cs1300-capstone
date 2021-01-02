import React from 'react';
import { Menu } from 'antd';
import LoginModal from './loginModal'
import RegisterModal from './registerModal'
import { Link } from 'react-router-dom'
import logo from '../img/logo-transparent.png'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.loginModal = React.createRef();
    this.registerModal = React.createRef();
  }
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
    if(e.key === "login") {
      console.log('haha');
      this.loginModal.current.showModal();
    } else if (e.key === "register") {
      this.registerModal.current.showModal();
    } else if (e.key === "logout") {
      localStorage.clear("currentUser");
      window.location.reload();
    };
  };

  render() {
    const { current } = this.state;
    const url = localStorage.getItem("currentUser") !== null ? "/user" : "/";
    // add in some form of redirect if user logged out?
    return (
      <div style={{height: '7vh'}}>
        <LoginModal ref={this.loginModal}></LoginModal>
        <RegisterModal ref={this.registerModal}></RegisterModal>
        <Link to={url}>
          <img src={logo} style={{float: 'left', height: '6vh', width: 'auto', paddingTop: '0.5vh'}}/>
        </Link>
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{float: 'right', height: '6vh', alignContent: 'middle', display: 'flex', lineHeight: '7vh', backgroundColor: 'transparent'}}>
          <Menu.Item key="mail" style={{alignItems: 'center'}}>
            Home
          </Menu.Item>
          {localStorage.getItem("currentUser") !== null ? 
            <Menu.Item key="logout">
              Logout
            </Menu.Item>
            :
            (<><Menu.Item key="login">
              Login
            </Menu.Item>
            <Menu.Item key="register">
              Sign Up
            </Menu.Item></>)}
        </Menu>
      </div>
    );
  }
}
