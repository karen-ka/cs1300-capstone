import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Avatar, Button, Divider, Rate, Statistic, Typography, Carousel } from 'antd';
import LoginModal from './loginModal';

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

        return (
            this.props.simple ?
                // SIMPLE GAME CARD
                <div style={{ display: 'flex' }}>
                    <LoginModal ref={this.loginModal}></LoginModal>
                    <Card
                        style={{ width: 500, flex: 1.5 }}
                        cover=
                        {
                            <img
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
                                Hosted by
                        </div>
                            <div style={{ flex: 1 }}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <br></br>
                                {this.props.gd.host}
                                <br></br>
                            </div>
                        </div>
                        <Divider />
                        <>
                            <div>
                                <Statistic valueStyle={{ fontSize: '.8rem' }} title="Price" value={this.props.gd.price} prefix={'USD'} />
                                <Statistic title="Platform" value={this.props.gd.location} />
                            </div>
                        </>
                    </Card>
                </div> :


                // COMPLEX GAME CARD
                <div style={{ display: 'flex', width: '60vw', minWidth: '700px' }} onClick={this.handleGameCardClick}>
                    <LoginModal ref={this.loginModal}></LoginModal>
                    <Card
                        style={{ width: 300, flex: 1.3 }}
                        cover={<img
                            style={{ objectFit: 'cover' }}
                            alt="example"
                            // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            src={`${this.props.gd.logo}`}
                        ></img>}
                    >
                        <Meta
                            style={{ textAlign: 'left' }}
                            title={this.props.gd.name}
                            description={<Paragraph ellipsis={{ rows: 3 }}>{this.props.gd.info}</Paragraph>}
                        />
                    </Card>
                    <Card
                        style={{ width: 100, flex: 1 }}
                        actions={[
                            this.props.loggedIn ?
                                <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center' }}>Book Now</Button> :
                                <Button type='primary' onClick={this.handleLoggedOutClick} style={{ justifyContent: 'center' }}>Book Now</Button>,
                            <Link to={`/game/${this.props.gd.gameID}`}>
                                <Button>More Info</Button>
                            </Link>
                        ]}
                    >

                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 0.5 }}>
                                {/* <br></br> */}
                                <Avatar size={75} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                {/* <br></br>
                                {this.props.hd.name} */}
                                <br></br>
                                <Rate disabled={true} defaultValue={this.props.hd.rating} style={{ fontSize: 10 }} />
                                <Paragraph>{`${this.props.hd.numberOfGames} games`}</Paragraph>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Title level={4} style={{ textAlign: 'left' }}>{this.props.hd.name}</Title>
                                {/* <Text type="secondary" style={{ textAlign: 'left' }}>EXPERIENCED HOST</Text> */}
                                {/* {this.props.hd.name} */}
                                {/* <br></br> */}
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
                    </Card>
                </div>

        );
    }
}