import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Card, Avatar, Space, Typography, Rate, Row, Col, Statistic, Button, Tag, Comment } from 'antd';
import { reviews } from '../gameData';
import ContactModal from './ContactModal';
import loginModal from './loginModal';
const { Text, Title, Paragraph } = Typography;
export default class HostCard extends React.Component {
  constructor (props) {
    super(props);
    this.contactModal = React.createRef();
    this.loginModal = React.createRef();
  }

  handleLoggedOutClick = () => {
    console.log('logged out click')
    this.loginModal.current.showModal();
  };

  handleLoggedInClick = () => {
    console.log('logged in click')
    this.contactModal.current.showModal();
  }

  render() {
    return (
      this.props.horizontal
        ?
        <Card className="ant-card-hover" style={{ width: "55vw", minWidth: '525px' }}>
          <ContactModal ref={this.contactModal} hd={this.props.hd}></ContactModal>
          <loginModal ref={this.loginModal}></loginModal>
          <Row justify="center" gutter={24}>
            <Col span={17}>
              <Link to={`/host/${this.props.hd.hostid}`}>
                <div className="trigger-card-hover" style={{ display: 'flex', height: '100%', width: 'auto' }}>
                  <Col span={8} >

                    <br />
                    <Avatar size={{ xs: 74, sm: 82, md: 90, lg: 114, xl: 130, xxl: 150 }} src={`${process.env.PUBLIC_URL}/${this.props.hd.pfp}`} style={{ marginBottom: '2vh' }} />
                    <br />
                    <Rate disabled defaultValue={this.props.hd.rating} style={{ fontSize: 12 }} />
                    <Paragraph>{`${this.props.hd.numberOfGames} games hosted`}</Paragraph>

                  </Col>
                  <Col span={16} style={{ display: 'flex', flexDirection: 'horizontal' }}>
                    <div style={{ flexGrow: '1', flexDirection: 'horizontal', paddingRight: '24px' }}>
                      <Title level={4} align="start">{this.props.hd.name}</Title>
                      <Text type="secondary" style={{
                        float: "left", whiteSpace: "pre-line"
                      }}>About</Text>
                      < br />
                      <Paragraph style={{ textAlign: "left", marginTop: '1vh' }} ellipsis={{ rows: 7 }}>{this.props.hd.about.split("\n").map((item, i) => <p key={i}>{item}</p>)}</Paragraph>
                    </div>
                    <div >
                      <Divider type="vertical" style={{ height: '100%', margin: 'auto' }} />
                    </div>

                  </Col>
                </div>
              </Link>
            </Col>

            <Col span={6} style={{ marginTop: '28px', paddingTop: '0.5em', }}>

              <Text type="secondary" style={{ float: "left" }}>Games Hosted</Text>
              <br />
              <div style={{ marginTop: '1vh', textAlign: "left" }}>
                {this.props.hd.gamesHosted.map(game => <Tag style={{ fontSize: '14px', marginBottom: '7px' }} color="default">{game}</Tag>)}
              </div>
              <br />

              <Statistic title="Price From" value={this.props.hd.minPrice} prefix={'USD'} />
              <br />

              {this.props.loggedIn ? <Button type="primary" onClick={this.handleLoggedInClick} style={{ width: '100%' }}>Contact Host</Button> :
                <Button type="primary" onClick={this.handleLoggedOutClick} style={{ width: '100%' }}>Contact Host</Button>}

            </Col>

            <br />


          </Row>
        </Card>
        :

        <Card style={{ minWidth: '250px' }}>
          <ContactModal ref={this.contactModal} hd={this.props.hd}></ContactModal>
          <loginModal ref={this.loginModal}></loginModal>
          <Col>
            <Avatar size={{ xs: 50, sm: 60, md: 80, lg: 120, xl: 160, xxl: 200 }} src={`${process.env.PUBLIC_URL}/${this.props.hd.pfp}`} />
            <Title level={3}>{this.props.hd.name}</Title>
            <br />
            {this.props.loggedIn ? <Button type="primary" onClick={this.handleLoggedInClick} style={{ width: '100%' }}>Contact Host</Button> :
              <Button type="primary" onClick={this.handleLoggedOutClick} style={{ width: '100%' }}>Contact Host</Button>}

            <Title style={{ marginTop: '24px' }} level={4} align="start">Statistics</Title>
            <div align="start">
              <Rate disabled defaultValue={this.props.hd.rating} style={{ fontSize: 20, marginRight: 24 }} />
              {this.props.hd.rating.toFixed(1)}
            </div>
            <Paragraph align="start">{`${this.props.hd.numberOfGames} games hosted`}</Paragraph>

            {this.props.onGameDetailPage ? <>

            </>
              :

              <><Title level={4} align="start">Games Hosted</Title>
                <Paragraph align="start">
                  <ul>
                    {this.props.hd.gamesHosted.map(game => <Tag style={{ fontSize: '14px' }} color="default">{game}</Tag>)}
                  </ul>
                </Paragraph>

              </>
            }

            <Title level={4} align="start">Reviews</Title>
            {
              this.props.hd.reviews.map((reviewID) => {
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

            {this.props.onGameDetailPage ? <>
              <br />
              <Link to={`/host/${this.props.hd.hostid}`}>
                <Button type="primary" style={{ width: '100%' }}>Learn More</Button>
              </Link>
            </>
              :

              <>

              </>
            }

          </Col>
        </Card>
    );
  }
}

