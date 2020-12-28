import React from 'react';
import { Card, Avatar, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const HostCard = (props) => {
  return (
    <Card>
      <Space direction="vertical">
        <Avatar size={256} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
        <Title>First Last</Title>
        <Title level={3} align="start">About Me</Title>
        <Paragraph align="start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
        <Title level={3} align="start">Statistics</Title>
        <Paragraph align="start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Paragraph>
        <Title level={3} align="start">Hosts</Title>
        <Paragraph align="start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Paragraph>
      </Space>
    </Card>
  );
}

export default HostCard;
