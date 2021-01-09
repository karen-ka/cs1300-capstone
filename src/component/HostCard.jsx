import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Card, Avatar, Space, Typography, Rate, Row, Col, Statistic, Button, Tag, Comment } from 'antd';
import { reviews } from '../gameData';

const { Text, Title, Paragraph } = Typography;
export default class LoginForm extends React.Component {
  render() {
    console.log(this.props);
    return (
      this.props.horizontal
        ?
        <Card style={{ width: "55vw", minWidth: '525px' }}>
          <Row justify="center" gutter={24}>
            <Col span={6} align="center">
              <br />
              <Avatar size={{ xs: 74, sm: 82, md: 90, lg: 114, xl: 130, xxl: 150 }} src={`${process.env.PUBLIC_URL}/${this.props.hd.pfp}`} style={{ marginBottom: '2vh' }} />
              <br />
              <Rate disabled defaultValue={this.props.hd.rating} style={{ fontSize: 12 }} />
              <Paragraph>{`${this.props.hd.numberOfGames} games hosted`}</Paragraph>

            </Col>
            <Col span={18}>
              <Title level={4} align="start">{this.props.hd.name}</Title>
              <Row>
                <Col span={12} style={{ paddingRight: '15px' }}>
                  <Text type="secondary" style={{
                    float: "left", whiteSpace: "pre-line"
                  }}>About</Text>
                  < br />
                  <Paragraph style={{ textAlign: "left", marginTop: '1vh' }} ellipsis={{ rows: 7 }}>{this.props.hd.about.split("\n").map((item, i) => <p key={i}>{item}</p>)}</Paragraph>

                </Col>

                <Col span={2}>
                  <Divider type="vertical" style={{ height: '100%' }} />
                </Col>

                <Col span={8}>
                  <Text type="secondary" style={{ float: "left" }}>Games Hosted</Text>
                  <br />
                  <div style={{ marginTop: '1vh', textAlign: "left" }}>
                    {this.props.hd.gamesHosted.map(game => <Tag style={{ fontSize: '14px', marginBottom: '7px' }} color="default">{game}</Tag>)}
                  </div>
                  <br />

                  <Statistic title="Price from" value={this.props.hd.minPrice} prefix={'USD'} />
                  <br />
                  <Link to={`/host/${this.props.hd.hostid}`}>
                    <Button type="primary">More Info</Button>
                  </Link>
                </Col>
              </Row>

              {/* <Statistic title="Games Hosted" ></Statistic> */}
              <br />
            </Col>
          </Row>
        </Card>
        :

        <Card style={{ minWidth: '250px' }}>
          <Col>
            <Avatar size={{ xs: 50, sm: 60, md: 80, lg: 120, xl: 160, xxl: 200 }} src={`${process.env.PUBLIC_URL}/${this.props.hd.pfp}`} />
            <Title level={3}>{this.props.hd.name}</Title>

            <Title level={4} align="start">Statistics</Title>
            <div align="start">
              <Rate disabled defaultValue={this.props.hd.rating} style={{ fontSize: 20, marginRight: 24 }} />
              {this.props.hd.rating.toFixed(1)}
            </div>
            <Paragraph align="start">{`${this.props.hd.numberOfGames} games hosted`}</Paragraph>

            {this.props.onGameDetailPage ? <>

              <Link to={`/host/${this.props.hd.hostid}`}>
                <Button type="primary">Learn More</Button>
              </Link>
            </>
              :

              <><Title level={4} align="start">Games Hosted</Title>
                <Paragraph align="start">
                  <ul>
                    {this.props.hd.gamesHosted.map(game => <Tag style={{ fontSize: '14px' }} color="default">{game}</Tag>)}
                  </ul>
                </Paragraph>

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
                }</>
            }

          </Col>
        </Card>
    );
  }
}

// export default HostCard;
