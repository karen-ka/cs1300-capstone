import React from 'react';
import { Menu } from 'antd';
import LoginModal from './loginModal'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.loginModal = React.createRef();
  }
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
    if(e.key === "login") {
      this.loginModal.current.showModal();
    }
  };

  render() {
    const { current } = this.state;
    return (
      <div>
      <LoginModal ref={this.loginModal}></LoginModal>
      <></>
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{float: 'right'}}>
        <Menu.Item key="mail" >
          Navigation One
        </Menu.Item>
        <Menu.Item key="login">
          Login
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Three - Link
          </a>
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}
