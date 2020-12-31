import React from 'react';
import { Layout, Row, Col, Card, Typography, Button, Statistic } from 'antd';
import Navbar from '../component/navbar.js';
import HostCard from '../component/HostCard.jsx'

import { gameinfo, hostData } from '../gameData';

const { Title, Paragraph } = Typography;
const { Header, Content } = Layout;

const Game = (props) => {
  const gameID = props.match.params.id;
  const gd = gameinfo[gameID];
  const hd = hostData[gd.hostid];

  return (
    <Layout>
      <Header>
        <Navbar/>
      </Header>
      <Content>
      <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
          <Col span={15}>
            <Card>
              <Title>{gd.name}</Title>
              <img src={gd.logo} width={600}/>
              <Paragraph>{gd.info}</Paragraph>
              <Row justify="space-around">
                <Col span={6}>
                  <Statistic title="Price" value={gd.price} prefix={'USD'} />
                  <Statistic title="Day" value={gd.day} />
                </Col>
                <Col span={6}>
                  <Statistic title="Location" value={gd.location} />
                  <Statistic title="Time" value={gd.time} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={7}>
            <Card style={{marginBottom: 24}}>
              <Title align="start" level={2}>Reserve Your Seat</Title>
              <Paragraph align="start">
                Price From:
                <br/>
                {`USD ${gd.price} / player`}
              </Paragraph>
              <Button align="center" type="primary">Book Now</Button>
            </Card>
            <HostCard hd={hd}/>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Game;
