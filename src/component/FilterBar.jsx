import React from 'react';
import { Space, Button, PageHeader } from 'antd';
import { Select } from 'antd';
import { Redirect } from 'react-router-dom';
const { Option } = Select;

const buttonStyle = {
  paddingLeft: '3px',
}
export default class FilterBar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      hostSearchRedirect: false,
      gameSearchRedirect: false,
    };
  }

  handleSearchTypeFilter = (value) => {
    console.log(value)
    if (value === "Games") {
      this.setState({ hostSearchRedirect: false, gameSearchRedirect: true });
      // this.state.hostSearchRedirect = false;
      // this.state.gameSearchRedirect = true;
      return <Redirect to='/search' />
    } else {
      this.setState({ hostSearchRedirect: true, gameSearchRedirect: false });
      // this.state.gameSearchRedirect = false;
      // this.state.hostSearchRedirect = true;
      return <Redirect to='/hostsearch' />
    }
  }

  render() {

    if (this.state.gameSearchRedirect) {
      return <Redirect to='/search' />
    }
    else if (this.state.hostSearchRedirect) {
      return <Redirect to='/hostsearch' />
    };
    return (
      <div>
        <PageHeader
          style={{ backgroundColor: '#181818' }}
          className="site-page-header"
          title={<>
            <Space>
              I'm looking for
            <Select defaultValue="Games" style={{ width: 120 }} onChange={this.handleSearchTypeFilter}>
                <Option value="Games">Games</Option>
                <Option value="Hosts">Hosts</Option>
              </Select>
          filtered by:
        {/* <Button shape="round" type="solid">Time</Button>
            <Button shape="round" type="solid">Price</Button>
            <Button shape="round" type="solid">Location</Button> */}
              <Select defaultValue="All Prices" style={{ width: 120 }} onChange={this.props.handlePriceFilter}>
                <Option value="All Prices">All Prices</Option>
                <Option value="20">&lt;20</Option>
                <Option value="30">&lt;30</Option>
                <Option value="40">&lt;40</Option>
              </Select>
              <Select defaultValue="All Games" style={{ width: 120 }} onChange={this.props.handleGameFilter}>
                <Option value="All Games">All Games</Option>
                <Option value="DnD">Dungeons and Dragons</Option>
                <Option value="Pandemic">Pandemic</Option>
                <Option value="Magic">Magic the Gathering</Option>
              </Select>
            </Space>
          </>
          }
        />
      </div>
    );
  }
}