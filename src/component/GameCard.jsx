import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Avatar, Button, Divider, Rate, Statistic, Typography } from 'antd';
import LoginModal from './loginModal';

const { Meta } = Card;
const { Paragraph, Title } = Typography;


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
                        style={{ width: 300, flex: 1.5 }}
                        cover={<img
                            alt="example"
                            // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            src={`${this.props.gd.logo}`}
                        ></img>}
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
                <div style={{ display: 'flex', width: '60vw', minWidth: '500px' }} onClick={this.handleGameCardClick}>
                    <LoginModal ref={this.loginModal}></LoginModal>
                    <Card
                        style={{ width: 300, flex: 1.3 }}
                        cover={<img
                            alt="example"
                            // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            src={`${this.props.gd.logo}`}
                        ></img>}
                    >
                        <Meta
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
                        <Title level={4} style={{ textAlign: 'center' }}>Hosted By</Title>

                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 0.5 }}>
                                <br></br>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <br></br>
                                {this.props.hd.name}
                                <br></br>
                                <Rate disabled={true} defaultValue={this.props.hd.rating} style={{ fontSize: 10 }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <br></br>
                                {<Paragraph style={{ textAlign: 'left' }} ellipsis={{ rows: 3 }}><><b>Intro: </b> {this.props.hd.intro}</></Paragraph>}
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