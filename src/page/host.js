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

            {/* <Carousel>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel> */}
            <Card>
              <Title style={{ textAlign: "left" }} level={3}>About Me</Title>
              <Paragraph align="start">
                {hd.about}
              </Paragraph>
            </Card>

            <Card style={{ marginTop: 24 }}>
              <Title style={{ textAlign: "left" }} level={3}>My Hosting Style</Title>
              <Paragraph align="start">
                {hd.style}
              </Paragraph>
            </Card>
            <Card style={{ marginTop: 24 }}>
              <Title style={{ textAlign: "left" }} level={3}>Reviews</Title>
              {
                hd.reviews.map((reviewID) => {
                  const review = reviews[reviewID];
                  return (
                    <Comment
                      align="start"
                      author={review.name}
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      content={review.review}
                    />
                  );
                })
              }
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout >
  );
}

export default Host;
