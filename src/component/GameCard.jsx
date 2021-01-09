import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Row, Col, Card, Avatar, Button, Divider, Rate, Statistic, Typography, Tag } from 'antd';
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
        const currStyle = this.props.onHostPage ? { display: 'flex', width: '45vw', minWidth: '600px' } : { display: 'flex', width: '55vw', minWidth: '720px' };
        const simpleStyle = this.props.onCheckoutModal ? { display: 'flex', width: '40vw', minWidth: '600px' } : { display: 'flex', width: '55vw', minWidth: '720px' };
        return (
            this.props.simple ?
                // SIMPLE GAME CARD
                <div style={simpleStyle}>
                    <LoginModal ref={this.loginModal}></LoginModal>
                    <Card
                        style={{ width: 300, flex: 1.2, }}
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
                            description={<Paragraph ellipsis={{ rows: 3 }}>{this.props.gd.info}</Paragraph>}
                        />
                    </Card>
                    <Card
                        style={{ width: 100, flex: 1 }}
                    >
                        <div style={{ display: 'flex' }}>

                            <div style={{ flex: 0.5, margin: 'auto', paddingRight: '10px' }}>
                                <Avatar size={90} src={`${process.env.PUBLIC_URL}/${this.props.hd.pfp}`} />
                            </div>

                            <div style={{ flex: 0.5 }}>
                                <Title level={4} style={{ textAlign: 'left', marginTop: '1vh' }}>{this.props.hd.name}</Title>

                                <Rate disabled={true} defaultValue={this.props.hd.rating} style={{ fontSize: 10, paddingRight: '1vw' }} />

                                <Text type="secondary">{`${this.props.hd.numberOfGames} games`}</Text>
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
                                        {this.props.onCheckoutModal ? <></> : <><Text type="secondary" style={{ float: "left" }}>Tags </Text>
                                            <br />
                                            {this.props.gd.tags.map(tag => <Tag style={{ fontSize: '14px', marginTop: '1vh' }} color="default">{tag}</Tag>)}</>}
                                        <Row style={{ marginTop: '1vh' }}>
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
                <div style={currStyle} onClick={this.handleGameCardClick}>
                    <LoginModal ref={this.loginModal}></LoginModal>
                    <Card
                        style={{ width: 300, flex: 1.2, }}
                        cover={<img
                            style={{ objectFit: 'contain', width: '100%' }}
                            src={`${this.props.gd.logo}`}
                        ></img>}
                    >
                        <Meta
                            style={{ textAlign: 'left' }}
                            title={this.props.gd.name}
                            description={
                                <><Paragraph ellipsis={{ rows: 4 }}>{this.props.gd.info}</Paragraph>
                                    {this.props.onHostPage ? <></> : <><Text type="secondary" style={{ float: "left" }}>Tags </Text>
                                        <br />
                                        {this.props.gd.tags.map(tag => <Tag style={{ fontSize: '14px', marginTop: '1vh' }} color="default">{tag}</Tag>)}</>}</>
                            }
                        />
                    </Card>
                    <Card
                        style={{ width: 100, flex: 1 }}
                    >
                        <div style={{ margin: 'auto' }}>
                            {this.props.onHostPage ?
                                <><br />
                                    <Text type="secondary" style={{ float: "left" }}>Tags </Text>
                                    <br />
                                    {this.props.gd.tags.map(tag => <Tag style={{ fontSize: '14px', marginTop: '1vh', float: 'left' }} color="default">{tag}</Tag>)}
                                    <br /><br />
                                </>
                                :
                                <><div style={{ display: 'flex' }}>
                                    <div style={{ flex: 0.5, paddingRight: '10px' }}>
                                        <Avatar size={90} src={`${process.env.PUBLIC_URL}/${this.props.hd.pfp}`} />
                                        <br></br>
                                    </div>
                                    <div style={{ flex: 0.5, textAlign: 'left' }}>
                                        <Title level={4} style={{ textAlign: 'left', marginTop: '1vh' }}>{this.props.hd.name}</Title>

                                        <Rate disabled={true} defaultValue={this.props.hd.rating} style={{ fontSize: 10, paddingRight: '1vw' }} />

                                        <Text type="secondary">{`${this.props.hd.numberOfGames} games`}</Text>
                                    </div>

                                </div>
                                    <div style={{ display: 'flex', paddingTop: '3vh' }}>

                                        <div>
                                            <Text type="secondary" style={{ float: "left" }}>Intro</Text>
                                            <br />
                                            {<Paragraph style={{ textAlign: 'left', marginTop: '1vh' }} ellipsis={{ rows: 3 }}><> {this.props.hd.intro}</></Paragraph>}
                                        </div>
                                    </div>
                                    <Divider /></>
                            }


                            <div>
                                {this.props.onHostPage ? <><br /> <br /></> : <></>}
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
                                {/* <br /> */}
                                {this.props.loggedIn ?
                                    <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center' }} disabled={disabled}>Book Now</Button> :
                                    <Button type='primary' onClick={this.handleLoggedOutClick} style={{ justifyContent: 'center' }}>Book Now</Button>}
                                <Link to={`/game/${this.props.gd.gameID}`}>
                                    <Button>More Info</Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div >

        );
    }
}