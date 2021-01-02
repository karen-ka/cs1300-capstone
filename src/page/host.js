import React from 'react';
import { Layout, Row, Col, Card, Typography, Avatar, Comment } from 'antd';
import Navbar from '../component/navbar.js';
import HostCard from '../component/HostCard.jsx'

import { hostData, reviews } from '../gameData';

const { Title, Paragraph } = Typography;
const { Header, Content } = Layout;

const Host = (props) => {
  const hostID = props.match.params.id;
  const hd = hostData[hostID];
  return (
    <Layout>
      <Header>
        <Navbar/>
      </Header>
      <Content>
        <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
          <Col span={7}>
            <HostCard hd={hd}/>
          </Col>
          <Col span={15}>
            <Card>
              <Title>My Hosting Style</Title>
              <Paragraph align="start">
                {hd.style}
              </Paragraph>
            </Card>
            <Card style={{ marginTop: 24 }}>
              <Title>Reviews</Title>
              {
                hd.reviews.map((reviewID) => {
                  const review = reviews[reviewID];
                  return (
                    <Comment
                      align="start"
                      author={review.name}
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                      content={review.review}
                    />
                  );
                })
              }
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Host;
