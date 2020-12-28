import React from 'react';
import { Layout, Row, Col, Card, Typography, Avatar, Comment } from 'antd';
import Navbar from '../component/navbar.js';
import HostCard from '../component/HostCard.jsx'

const { Title, Paragraph } = Typography;
const { Header, Content } = Layout;

const Host = (props) => {
  return (
    <Layout>
      <Header>
        <Navbar/>
      </Header>
      <Content>
        <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
          <Col span={7}>
            <HostCard />
          </Col>
          <Col span={15}>
            <Card>
              <Title>My Hosting Style</Title>
              <Paragraph align="start">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Paragraph>
            </Card>
            <Card style={{ marginTop: 24 }}>
              <Title>Reviews</Title>
              <Comment
                align="start"
                author={<a>Han Solo</a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully
                    and efficiently.
                  </p>
                }
              />
                            <Comment
                align="start"
                author={<a>Han Solo</a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully
                    and efficiently.
                  </p>
                }
              />
                            <Comment
                align="start"
                author={<a>Han Solo</a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully
                    and efficiently.
                  </p>
                }
              />
                            <Comment
                align="start"
                author={<a>Han Solo</a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully
                    and efficiently.
                  </p>
                }
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Host;
