import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Space, Typography, Rate, Row, Col, Statistic, Button } from 'antd';

const { Title, Paragraph } = Typography;

const HostCard = (props) => {
  return (
    props.horizontal
    ?
    <Card style={{width: "60vh"}}>
      <Row justify="center" gutter={24}>
        <Col span={6} align="center">
          <Avatar size={128} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          <Rate disabled defaultValue={props.hd.rating} style={{ fontSize: 20, marginRight: 24 }}/>
          <Paragraph>{`${props.hd.numberOfGames} games hosted`}</Paragraph>
        </Col>
        <Col span={12}>
          <Title level={3} align="start">{props.hd.name}</Title>
          <Statistic title="About Me" value={props.hd.about} />
        </Col>
        <Col span={6}>
          <Title level={3} align="start">I Host:</Title>
          <Paragraph align="start">
            <ul>
              {props.hd.gamesHosted.map(game => <li>{game}</li>)}
            </ul>
          </Paragraph>
          <Link to={`/host/${props.hd.hostid}`}>
            <Button type="primary">More Info</Button>
          </Link>
        </Col>
      </Row>
    </Card>
    :
    <Card>
      <Space direction="vertical">
        <Avatar size={256} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
        <Title>{props.hd.name}</Title>
        <Title level={3} align="start">About Me</Title>
        <Paragraph align="start">
          {props.hd.about}
        </Paragraph>
        <Title level={3} align="start">Statistics</Title>
        <div align="start">
          <Rate disabled defaultValue={props.hd.rating} style={{ fontSize: 20, marginRight: 24 }}/>
          {props.hd.rating}
        </div>
        <Paragraph align="start">{`${props.hd.numberOfGames} games hosted`}</Paragraph>
        <Title level={3} align="start">Hosts</Title>
        <Paragraph align="start">
          <ul>
            {props.hd.gamesHosted.map(game => <li>{game}</li>)}
          </ul>
        </Paragraph>
      </Space>
    </Card>
  );
}

export default HostCard;
