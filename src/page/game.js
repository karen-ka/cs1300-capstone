import React from 'react';
import { Layout, Row, Col, Card, Typography, Avatar, Comment } from 'antd';
import Navbar from '../component/navbar.js';
import HostCard from '../component/HostCard.jsx'

const { Title, Paragraph } = Typography;
const { Header, Content } = Layout;

const Game = (props) => {
  const gameID = props.match.params.id;

  return (
    <Layout>
      <Header>
        <Navbar/>
      </Header>
      <Content>
      </Content>
    </Layout>
  );
}

export default Game;
