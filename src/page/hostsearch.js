import React from 'react';
import { Layout, Space } from 'antd';
import Navbar from '../component/navbar';
import HostCard from '../component/HostCard';

import { hostData } from '../gameData';
const { Header, Content } = Layout;

const HostSearch = (props) => {
  // creating and storing horizontal host cards
  const HostCards = []
  for (const [_, host] of Object.entries(hostData)) {
    HostCards.push(<HostCard horizontal hd={host}/>)
  }

  return (
    <Layout>
      <Header>
        <Navbar/>
      </Header>
      <Content>
        <Space direction="vertical">
          { HostCards }
        </Space>
      </Content>
    </Layout>
  );
}

export default HostSearch;
