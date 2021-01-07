import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Space, Typography, Rate, Row, Col, Statistic, Button, Tag } from 'antd';

const { Text, Title, Paragraph } = Typography;

const HostCard = (props) => {
  return (
    props.horizontal
      ?
      <Card style={{ width: "60vw" }}>
        <Row justify="center" gutter={24}>
          <Col span={6} align="center">
            <Avatar size={96} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginBottom: '2vh' }} />
            {/* <Title level={4} align="start"></Title> */}
            <br />
            <Rate disabled defaultValue={props.hd.rating} style={{ fontSize: 12 }} />
            <Paragraph>{`${props.hd.numberOfGames} games hosted`}</Paragraph>

            <Link to={`/host/${props.hd.hostid}`}>
              <Button type="primary">More Info</Button>
            </Link>
          </Col>
          <Col span={18}>
            <Title level={4} align="start">{props.hd.name}</Title>
            {/* <Statistic title="About" value={props.hd.about} /> */}

            <Text type="secondary" style={{ float: "left" }}>About</Text>
            <br />
            <Paragraph style={{ textAlign: "left" }} ellipsis={{ rows: 4 }}>{props.hd.about}</Paragraph>

            <Text type="secondary" style={{ float: "left" }}>Games Hosted</Text>
            <br />
            <div style={{ marginTop: '1vh', float: "left" }}>
              {props.hd.gamesHosted.map(game => <Tag style={{ fontSize: '14px' }} color="default">{game}</Tag>)}
            </div>
            {/* <Statistic title="Games Hosted" ></Statistic> */}
            <br />
          </Col>
          {/* <Col span={6}>
            <Title level={3} align="start">Games Hosted:</Title>
            <Paragraph align="start">
              <ul>
                {props.hd.gamesHosted.map(game => <li>{game}</li>)}
              </ul>
            </Paragraph>
            <Link to={`/host/${props.hd.hostid}`}>
              <Button type="primary">More Info</Button>
            </Link>
          </Col> */}
        </Row>
      </Card>
      :
      <Card>
        <Col>
          <Avatar size={256} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Title level={3}>{props.hd.name}</Title>
          {/* <Title level={4} align="start">About Me</Title>
          <Paragraph align="start">
            {props.hd.about}
          </Paragraph> */}
          <Title level={4} align="start">Statistics</Title>
          <div align="start">
            <Rate disabled defaultValue={props.hd.rating} style={{ fontSize: 20, marginRight: 24 }} />
            {props.hd.rating.toFixed(1)}
          </div>
          <Paragraph align="start">{`${props.hd.numberOfGames} games hosted`}</Paragraph>

          {props.onGameDetailPage ? <>

            <Link to={`/host/${props.hd.hostid}`}>
              <Button type="primary">Learn More</Button>
            </Link>
          </>
            :

            <><Title level={4} align="start">Games Hosted</Title>
              <Paragraph align="start">
                <ul>
                  {props.hd.gamesHosted.map(game => <Tag style={{ fontSize: '14px' }} color="default">{game}</Tag>)}
                </ul>
              </Paragraph>

              <Title level={4} align="start">Reviews</Title></>
          }

        </Col>
      </Card>
  );
}

export default HostCard;
