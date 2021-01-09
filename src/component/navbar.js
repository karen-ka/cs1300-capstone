import React from 'react';
import { Menu } from 'antd';
import LoginModal from './loginModal'
import RegisterModal from './registerModal'
import { Link } from 'react-router-dom'
import logo from '../img/logo-transparent.png'
import user from '../img/user_icon.jpg'
import { Redirect } from 'react-router-dom';
import {
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.loginModal = React.createRef();
    this.registerModal = React.createRef();
  }
  state = {
    current: 'mail',
    redirectHome: false,
    redirectUser: false,
    redirectGame: false,
    redirectHost: false
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
    if (e.key === "login") {
      console.log('haha');
      this.loginModal.current.showModal();
    } else if (e.key === "register") {
      this.registerModal.current.showModal();
    } else if (e.key === "logout") {
      localStorage.clear("currentUser");
      if (window.location.pathname == '/user') {
        this.setState({ redirectHome: true });
      } else {
        window.location.reload();
      };
    } else if (e.key === "home") {
      this.setState({ redirectHome: true });
    } else if (e.key === "user") {
      this.setState({ redirectUser: true });
    } else if (e.key === "game_search") {
      this.setState({ redirectGame: true });
    } else if (e.key === "host_search") {
      this.setState({ redirectHost: true });
    };
  };

  render() {
    const { current } = this.state;
    const url = "/";
    if (this.state.redirectHome) {
      // can remove this to just not do anything if already at home. Currently reloads
      if (window.location.pathname == '/') {
        window.location.reload();
      };
      return <Redirect to='/' />
    } else if (this.state.redirectUser) {
      if (window.location.pathname == '/user') {
        window.location.reload();
      };
      return <Redirect to='/user' />
    } else if (this.state.redirectGame) {
      if (window.location.pathname == '/search') {
        window.location.reload();
      };
      return <Redirect to='/search' />
    } else if (this.state.redirectHost) {
      if (window.location.pathname == '/hostsearch') {
        window.location.reload();
      };
      return <Redirect to='/hostsearch' />
    };

    // add in some form of redirect if user logged out?
    return (
      <div style={{ height: '7vh', width: '95%', margin: 'auto' }}>
        <LoginModal ref={this.loginModal}></LoginModal>
        <RegisterModal ref={this.registerModal}></RegisterModal>
        <Link to={url}>
          <img src={logo} style={{ float: 'left', height: '6vh', width: 'auto', paddingTop: '0.5vh' }} />
        </Link>
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ float: 'right', height: '6vh', alignContent: 'middle', display: 'flex', lineHeight: '7vh', backgroundColor: 'transparent' }}>
          <Menu.Item key="game_search">
            Find Games
          </Menu.Item>
          <Menu.Item key="host_search">
            Find Hosts
          </Menu.Item>
          {localStorage.getItem("currentUser") !== null ?
            <SubMenu key="userMenu" icon={<UserOutlined />} popupOffset={[-30, 0]} >
              <Menu.Item key="user" >Dashboard</Menu.Item>
              <Menu.Divider></Menu.Divider>
              <Menu.Item key="logout" >Logout</Menu.Item>
            </SubMenu>

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
