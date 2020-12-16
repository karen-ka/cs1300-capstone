import React from 'react';
import { Space, Button, PageHeader } from 'antd';

const buttonStyle = {
    paddingLeft: '3px',
}
export default class FilterBar extends React.Component {

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
    return (
      <div>
        <PageHeader
        style={{backgroundColor: '#181818'}}
        className="site-page-header"
        title={<>
        <Space>
          Filters:
        <Button shape="round" type="solid">Time</Button>
            <Button shape="round" type="solid">Price</Button>
            <Button shape="round" type="solid">Location</Button>
        </Space>
        </>
        }
        />
      </div>
    );
  }
}