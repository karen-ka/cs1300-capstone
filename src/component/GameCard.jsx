import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Row, Col, Card, Avatar, Button, Divider, Rate, Statistic, Typography, Carousel } from 'antd';
import LoginModal from './loginModal';
import {
    CalendarOutlined,
    ShareAltOutlined,
    MessageOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
const { Paragraph, Title, Text } = Typography;


export default class GameCard extends React.Component {
    constructor (props) {
        super(props);
        this.loginModal = React.createRef();
    }

    handleLoggedOutClick = () => {
        this.loginModal.current.showModal();
    };

    handleLoggedInClick = () => {
        this.props.onBook(this.props.gd);
    }

    handleGameCardClick = () => {
        console.log('placeholder');
    }

    /**
     * ref for future me: this.props.simple: true if shown on checkout screen, false otherwise. we could probably combine and move the bool logic down, but ehh.
     * === You should most likely make changes in BOTH modals ===
     */
    render() {
        const disabled = this.props.nobook ? true : false;
        return (
            this.props.simple ?
                // SIMPLE GAME CARD
                <div style={{ display: 'flex', width: '55vw', minWidth: '700px' }}>
                    <LoginModal ref={this.loginModal}></LoginModal>
                    <Card
                        style={{ width: 300, flex: 1.3, }}
                        cover=
                        {
                            <img
                                style={{ objectFit: 'contain' }}
                                src={`${this.props.gd.logo}`}
                            />
                        }
                    >
                        <Meta
                            title={this.props.gd.name}
                            description={<Paragraph ellipsis={{ rows: 2 }}>{this.props.gd.info}</Paragraph>}
                        />
                    </Card>
                    <Card
                        style={{ width: 100, flex: 1 }}
                    >
                        <div style={{ display: 'flex' }}>

                            <div style={{ flex: 1 }}>
                                <Avatar size={90} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </div>

                            <div style={{ flex: 1 }}>
                                <br />
                                <Statistic title="Host" value={this.props.gd.host} />
                            </div>
                        </div>
                        <Divider />
                        <>
                            {/* helo future self. this differentiates whats on the simple card b/t checkout modal and user dashboard. namely, the user dashboard wont show price and instead shows action items like add to calendar blah etc etc*/}
                            <div>
                                {this.props.onCheckoutModal ?
                                    <>
                                        <div>
                                            <br />
                                            <Row>
                                                <Col span={12}>
                                                    <Statistic title="Price" value={this.props.gd.price} prefix={'USD'} />
                                                </Col>
                                                <Col span={12}>
                                                    <Statistic title="Platform" value={this.props.gd.location} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>
                                                    <Statistic title="Day" value={this.props.gd.day} />
                                                </Col>
                                                <Col span={12}>
                                                    <Statistic title="Time" value={this.props.gd.time} />
                                                </Col>
                                            </Row>

                                        </div>

                                    </>
                                    :
                                    <div>
                                        <Row>
                                            <Col span={12}>
                                                <Statistic title="Day" value={this.props.gd.day} />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic title="Time" value={this.props.gd.time} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <Statistic title="Platform" value={this.props.gd.location} />
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col span={24} style={{ textAlign: "right" }}>
                                                <Tooltip title="Message host">
                                                    <Button shape="circle" icon={<MessageOutlined />} style={{ margin: "0 5px 0 5px" }} />
                                                </Tooltip>
                                                <Tooltip title="Add to calendar">
                                                    <Button shape="circle" icon={<CalendarOutlined />} style={{ margin: "0 5px 0 5px" }} />
                                                </Tooltip>
                                                <Tooltip title="Share">
                                                    <Button shape="circle" icon={<ShareAltOutlined />} style={{ margin: "0 5px 0 5px" }} />
                                                </Tooltip>

                                            </Col>
                                        </Row>
                                    </div>
                                }

                            </div>
                        </>
                    </Card>
                </div> :


                // COMPLEX GAME CARD
                <div style={{ display: 'flex', width: '55vw', minWidth: '700px' }} onClick={this.handleGameCardClick}>
                    <LoginModal ref={this.loginModal}></LoginModal>
                    <Card
                        style={{ width: 300, flex: 1.3, }}
                        cover={<img
                            style={{ objectFit: 'contain' }}
                            src={`${this.props.gd.logo}`}
                        ></img>}
                    >
                        <Meta
                            style={{ textAlign: 'left' }}
                            title={this.props.gd.name}
                            description={<Paragraph ellipsis={{ rows: 2 }}>{this.props.gd.info}</Paragraph>}
                        />
                    </Card>
                    <Card
                        style={{ width: 100, flex: 1 }}
                    >

                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 0.5 }}>
                                <Avatar size={75} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <br></br>
                                <Rate disabled={true} defaultValue={this.props.hd.rating} style={{ fontSize: 10 }} />
                                <Paragraph>{`${this.props.hd.numberOfGames} games`}</Paragraph>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Title level={4} style={{ textAlign: 'left' }}>{this.props.hd.name}</Title>
                                <Text type="secondary" style={{ float: "left" }}>Intro</Text>
                                <br />
                                {<Paragraph style={{ textAlign: 'left' }} ellipsis={{ rows: 3 }}><> {this.props.hd.intro}</></Paragraph>}
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Price" value={this.props.gd.price} prefix={'USD'} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Platform" value={this.props.gd.location} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Day" value={this.props.gd.day} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Time" value={this.props.gd.time} />
                                </Col>
                            </Row>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }}>
                            {this.props.loggedIn ?
                                <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center' }} disabled={disabled}>Book Now</Button> :
                                <Button type='primary' onClick={this.handleLoggedOutClick} style={{ justifyContent: 'center' }}>Book Now</Button>}
                            <Link to={`/game/${this.props.gd.gameID}`}>
                                <Button>More Info</Button>
                            </Link>
                        </div>
                    </Card>
                </div>

        );
    }
}