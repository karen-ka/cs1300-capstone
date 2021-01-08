import React from 'react';
import { Layout, Row, Col, Card, Typography, Avatar, Comment, Carousel } from 'antd';
import Navbar from '../component/navbar.js';
import HostCard from '../component/HostCard.jsx'

import { hostData, reviews } from '../gameData';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const contentStyle = {
  height: '30vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Host = (props) => {
  const hostID = props.match.params.id;
  const hd = hostData[hostID];
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ width: '80%', margin: 'auto' }}>
        <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
          <Col span={7}>
            <HostCard hd={hd} />
          </Col>
          <Col span={15}>

            <Card>
              <Title style={{ textAlign: "left" }} level={3}>About Me</Title>
              <Paragraph align="start">
                {hd.about.split("\n").map((item, i) => <p key={i}>{item}</p>)}
              </Paragraph>
            </Card>

            <Card style={{ marginTop: 24 }}>
              <Title style={{ textAlign: "left" }} level={3}>My Hosting Style</Title>
              <Paragraph align="start">
                {hd.style}
              </Paragraph>
            </Card>
            <Card style={{ marginTop: 24 }}>
              <Title style={{ textAlign: "left" }} level={3}>Hosted Games</Title>
              SHOW GAMES HERE
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout >
  );
}

export default Host;
