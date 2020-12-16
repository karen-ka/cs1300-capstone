import React from 'react';
import { Space, Button, PageHeader } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

const buttonStyle = {
    paddingLeft: '3px',
}
export default class FilterBar extends React.Component {
  render() {
    return (
      <div>
        <PageHeader
        style={{backgroundColor: '#181818'}}
        className="site-page-header"
        title={<>
        <Space>
          Filters:
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