import React from 'react';
import { Layout, Space } from 'antd';
import Navbar from '../component/navbar';
import HostCard from '../component/HostCard';
import FilterBar from '../component/FilterBar'
import { hostData } from '../gameData';
const { Header, Content, Footer } = Layout;

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
          <div style={{ textAlign: 'left', width: '50%', margin: 'auto', padding: '3vh 0 3vh 0' }}>
            <h1>Find the best host for your needs.</h1>
            <p>
              We’ve got you covered. Whether you’re new or a pro, choose from one of our experienced game hosts! On StartPlaying.Games, you’ll find the perfect host that fits your playing style.
          </p>
          </div>
          <br />
          <Space direction="vertical" size={48}>
            {this.HostCards}
          </Space>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}
