import React from 'react';
import { Card, Avatar, Space, Typography, Rate, Statistic } from 'antd';

const { Title, Paragraph } = Typography;

const HostCard = (props) => {
  return (
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
