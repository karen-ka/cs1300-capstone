import React from 'react';
import { Menu } from 'antd';
import LoginModal from './loginModal'
import RegisterModal from './registerModal'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router'

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
      this.loginModal.current.showModal();
    } else if (e.key === "register") {
      this.registerModal.current.showModal();
    } else if (e.key === "logout") {
      localStorage.clear("currentUser");
    };
  };

  render() {
    const { current } = this.state;
    // add in some form of redirect if user logged out?
    return (
      <div>
        <></>
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{float: 'right', height: '5vh', alignContent: 'middle', display: 'flex', lineHeight: '5vh'}}>
          <Menu.Item key="mail" style={{alignItems: 'center'}}>
            Navigation One
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
              Register
            </Menu.Item></>)}
        </Menu>
      </div>
    );
  }
}
