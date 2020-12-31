import React from 'react';
import { Layout, Row, Col, Card, Typography, Button } from 'antd';
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
              <Row>
                <Col span={12}>
                  <Paragraph>
                    Price:
                    <br/>
                    {`USD ${gd.price}`}
                  </Paragraph>
                  <Paragraph>
                    Day:
                    <br/>
                    {gd.day}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <Paragraph>
                    Location:
                    <br/>
                    {gd.location}
                  </Paragraph>
                  <Paragraph>
                    Time:
                    <br/>
                    {gd.time}
                  </Paragraph>
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
