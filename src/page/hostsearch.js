import React from 'react';
import { Layout, Space, Tag } from 'antd';
import Navbar from '../component/navbar';
import HostCard from '../component/HostCard';
import FilterBar from '../component/FilterBar'
import { hostData } from '../gameData';
const { Header, Content, Footer } = Layout;

export default class Search extends React.Component {
  constructor (props) {
    super(props);
    this.HostCards = [];
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    // creating and storing horizontal host cards
    for (const [_, host] of Object.entries(hostData)) {
      this.HostCards.push(<HostCard loggedIn={this.loggedIn} horizontal hd={host} />)
    }
  }

  // getDisplayText = () => {
  //   if (this.HostCards.length == 1) {
  //     return "1 host";
  //   } else {
  //     return `${this.HostCards.length} hosts`;
  //   }
  // }

  getDisplayText = () => {
    if (this.HostCards.length == 1) {
      return <Tag style={{ marginTop: '0.5em', marginRight: '0' }}>1 host</Tag>;
    } else if (this.HostCards.length > 0) {
      return <Tag style={{ marginTop: '0.5em', marginRight: '0' }}>{this.HostCards.length} hosts</Tag>
    }
  }

  render() {
    return (
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <FilterBar page="Hosts" handleGameFilter={this.handleGameFilter} handlePriceFilter={this.handlePriceFilter} />
          <div style={{ textAlign: 'left', width: '50%', margin: 'auto', padding: '3vh 0 3vh 0', minWidth: '400px' }}>
            <h1 style={{ float: 'left', paddingRight: '24px' }}>Find the best host for your needs.</h1> {this.getDisplayText()}
            <br />
            <br />
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
