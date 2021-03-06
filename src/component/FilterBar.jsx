import React from 'react';
import { Space, PageHeader } from 'antd';
import { Select } from 'antd';
import { Redirect } from 'react-router-dom';
const { Option } = Select;

export default class FilterBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hostSearchRedirect: false,
      gameSearchRedirect: false,
    };
  }

  handleSearchTypeFilter = (value) => {
    if (value === "Games") {
      this.setState({ hostSearchRedirect: false, gameSearchRedirect: true });
    } else {
      this.setState({ hostSearchRedirect: true, gameSearchRedirect: false });
    }
  }

  render() {
    if (this.state.gameSearchRedirect) {
      return <Redirect to='/search' />
    }
    else if (this.state.hostSearchRedirect) {
      return <Redirect to='/hostsearch' />
    }

    const currTitle = (this.props.page === "Games") ?
      <><div className="d-filterbar">


        <div style={{ width: '100%', paddingLeft: '30px', paddingRight: '30px' }}>
          <Space style={{ fontWeight: '400' }}>
            I'm looking for
        <Select defaultValue={this.props.page} style={{ width: 120 }} onChange={this.handleSearchTypeFilter}>
              <Option value="Games">Games</Option>
              <Option value="Hosts">Hosts</Option>
            </Select>
        filtered by:
          <Select defaultValue="All Games" style={{ width: 200 }} onChange={this.props.handleGameFilter}>
              <Option value="All Games">All Game Types</Option>
              <Option value="DnD">Dungeons and Dragons</Option>
              <Option value="Magic">Magic: the Gathering</Option>
              <Option value="Pandemic">Pandemic</Option>
            </Select>
            <Select defaultValue="All Prices" style={{ width: 120 }} onChange={this.props.handlePriceFilter}>
              <Option value="All Prices">All Prices</Option>
              <Option value="20">&lt; $20</Option>
              <Option value="30">&lt; $30</Option>
              <Option value="40">&lt; $40</Option>
            </Select>
          </Space>
        </div>     </div>

        <div className="m-filterbar">

          <Space style={{ fontWeight: '400', margin: 'auto', justifyContent: 'center' }}>
            <Select dropdownMatchSelectWidth={false} defaultValue={this.props.page} style={{ width: 90 }} onChange={this.handleSearchTypeFilter}>
              <Option value="Games">Games</Option>
              <Option value="Hosts">Hosts</Option>
            </Select>
            <Select dropdownMatchSelectWidth={false} defaultValue="All Games" style={{ width: 150 }} onChange={this.props.handleGameFilter}>
              <Option value="All Games">All Game Types</Option>
              <Option value="DnD">Dungeons and Dragons</Option>
              <Option value="Magic">Magic: the Gathering</Option>
              <Option value="Pandemic">Pandemic</Option>
            </Select>
            <Select dropdownMatchSelectWidth={false} defaultValue="All Prices" style={{ width: 105 }} onChange={this.props.handlePriceFilter}>
              <Option value="All Prices">All Prices</Option>
              <Option value="20">&lt; $20</Option>
              <Option value="30">&lt; $30</Option>
              <Option value="40">&lt; $40</Option>
            </Select>
          </Space>
        </div>
      </> :

      <>
        <div className="d-filterbar">
          <div style={{ width: '100%', paddingLeft: '30px', paddingRight: '30px' }}>
            <Space style={{ fontWeight: '400' }}>
              I'm looking for
        <Select defaultValue={this.props.page} style={{ width: 120 }} onChange={this.handleSearchTypeFilter}>
                <Option value="Games">Games</Option>
                <Option value="Hosts">Hosts</Option>
              </Select>
            </Space>
          </div>
        </div>

        <div className="m-filterbar">
          {/* <div style={{ width: '100%', paddingLeft: '30px', paddingRight: '30px' }}> */}
          <Space style={{ fontWeight: '400', justifyContent: 'center', margin: 'auto' }}>

            <Select defaultValue={this.props.page} style={{ width: 90 }} onChange={this.handleSearchTypeFilter}>
              <Option value="Games">Games</Option>
              <Option value="Hosts">Hosts</Option>
            </Select>
          </Space>
          {/* </div> */}
        </div>

      </>

    return (
      <div>
        <PageHeader
          style={{ backgroundColor: '#1f1f1f', borderTop: '1px solid rgb(80,80,80)', }}
          className="site-page-header"
          title={currTitle}
        />
      </div>
    );
  }
}
