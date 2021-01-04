import React from 'react';
import { Layout, Space } from 'antd';
import Navbar from '../component/navbar';
import HostCard from '../component/HostCard';
import FilterBar from '../component/FilterBar'
import { hostData } from '../gameData';
const { Header, Content } = Layout;

export default class Search extends React.Component {
  constructor (props) {
    super(props);
    this.HostCards = [];
    // creating and storing horizontal host cards
    for (const [_, host] of Object.entries(hostData)) {
      this.HostCards.push(<HostCard horizontal hd={host} />)
    }
  }

  handlePriceFilter = (_) => {
  }

  handleGameFilter = (_) => {
  }

  render() {
    return (
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <FilterBar page="Hosts" handleGameFilter={this.handleGameFilter} handlePriceFilter={this.handlePriceFilter} />
          <br/>
          <Space direction="vertical" size={"large"}>
            {this.HostCards}
          </Space>
        </Content>
      </Layout>
    );
  }
}
