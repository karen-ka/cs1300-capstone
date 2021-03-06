import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Row, Col, Card, Avatar, Button, Divider, Rate, Statistic, Typography, Tag, Alert, message } from 'antd';
import LoginModal from './loginModal';
import ContactModal from './ContactModal';
import {
    CalendarOutlined,
    ShareAltOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import moment from 'moment';
const { Meta } = Card;
const { Paragraph, Title, Text } = Typography;

export default class GameCard extends React.Component {
    constructor (props) {
        super(props);
        this.loginModal = React.createRef();
        this.contactModal = React.createRef();
    }

    handleLoggedOutClick = () => {
        this.loginModal.current.showModal();
    };

    handleLoggedInClick = () => {
        this.props.onBook(this.props.gd);
    }

    handleMessageClick = () => {
        if (this.props.loggedIn) {
            this.contactModal.current.showModal();
        }
    }

    handleShareClick = () => {
        navigator.clipboard.writeText('Check out StartPlaying.Games for a great tabletop gaming experience! Learn more at https://aqueous-coast-45927.herokuapp.com/')
        return message.success('Share message copied to clipboard');
    }

    generateGcal = () => {
        const hour = parseInt(this.props.gd.time) + 12;
        const date = moment().day(`${this.props.gd.day}`).hour(hour).minute(0);
        const dateUntil = moment().day(`${this.props.gd.day}`).hour(hour + 2).minute(0);
        const dateUntilFormatted = dateUntil.format("YYYY MM DD [T] HH mm [Z");
        const dateFormatted = date.format("YYYY MM DD [T] HH mm [Z]");
        const name = this.props.gd.name.replace(/\s+/g, '+');
        const details = `Booked+on+StartPlaying.Games+Capstone+Example`

        return `https://calendar.google.com/calendar/r/eventedit?text=${name}&dates=${dateFormatted}/${dateUntilFormatted}&details=${details}&recur=RRULE:FREQ%3DWEEKLY&location=${this.props.gd.location}`.replace(/\s+/g, '');
    }


    /**
     * ref for future me: this.props.simple: true if shown on checkout screen, false otherwise. we could probably combine and move the bool logic down, but ehh.
     * === You should most likely make changes in BOTH modals ===
     */
    render() {
        const disabled = this.props.nobook ? true : false;
        const currStyle = this.props.onHostPage ? { display: 'flex', width: '100%', minWidth: '300px' } : { display: 'flex', width: '55vw', minWidth: '720px' };
        const simpleStyle = this.props.onCheckoutModal ? { display: 'flex', width: '40vw', minWidth: '600px' } : { display: 'flex', width: '55vw', minWidth: '720px' };
        const divId = this.props.onHostPage ? "left-ant-card" : "left-card";
        const leftCardStyle = this.props.onHostPage ? { margin: 'auto', height: '100%', padding: '48px 24px 48px 24px', display: 'flex', flexDirection: 'column', width: '100%' } : { padding: '24px', margin: 'auto', display: 'flex', flexDirection: 'column', height: '100%' };

        const loginMsg = (<Alert
            message="Log In required to book games"
            type="info"
            showIcon
        />);

        return (
            <>
                <ContactModal ref={this.contactModal} hd={this.props.hd}></ContactModal>
                <LoginModal msg={loginMsg} ref={this.loginModal}></LoginModal>
                {this.props.simple ?
                    // SIMPLE GAME CARD - only used by checkout modal
                    <div style={simpleStyle}>
                        <Card
                            style={{ width: 300, flex: 1.2, pointerEvents: 'none' }}
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
                            style={{ width: 100, flex: 1, pointerEvents: 'none' }}
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
                                <div>
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
                                                <Statistic title="Time" value={`${this.props.gd.time}pm`} />
                                            </Col>
                                        </Row>

                                    </div>

                                </div>
                            </>
                        </Card>
                    </div> :


                    // COMPLEX GAME CARD
                    <>
                        <div className="m-gamecard">
                            <Card
                                style={{ height: '100%', width: '90%', margin: 'auto', flexDirection: 'horizontal' }}
                                bodyStyle={{ padding: 'unset', }}
                                className="ant-card-hover"
                            >

                                <Link to={`/game/${this.props.gd.gameID}`}>
                                    <div className="trigger-card-hover" style={{ height: '100%' }}>
                                        <Row style={{ display: 'flex', flexDirection: 'vertical' }}>

                                            <Col span={24} style={{ textAlign: 'left' }}>

                                                <div style={{ flexGrow: '1' }}>
                                                    <img
                                                        style={{ objectFit: 'contain', width: '100%', marginBottom: '10px', }}
                                                        src={`${this.props.gd.logo}`}
                                                    ></img>


                                                    <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px' }}>
                                                        <Title level={3}>{this.props.gd.name}</Title>
                                                        <Paragraph ellipsis={{ rows: 4 }}>{this.props.gd.info}</Paragraph>
                                                    </div>
                                                </div>


                                            </Col>

                                        </Row>

                                        <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
                                            <Row>
                                                <Col span={12}>
                                                    <Statistic style={{ textAlign: 'center' }} title="Price" value={this.props.gd.price} prefix={'USD'} />
                                                </Col>
                                                <Col span={12}>
                                                    <Statistic style={{ textAlign: 'center' }} title="Platform" value={this.props.gd.location} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>
                                                    <Statistic style={{ textAlign: 'center' }} title="Day" value={this.props.gd.day} />
                                                </Col>
                                                <Col span={12}>
                                                    <Statistic style={{ textAlign: 'center' }} title="Time" value={`${this.props.gd.time}pm`} />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                </Link>

                                <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto', width: '80%', paddingBottom: '24px', paddingTop: '1vh' }}>
                                    {this.props.loggedIn && !this.props.onUserPage ?
                                        (disabled ?
                                            (
                                                <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center', width: '100%' }} disabled={disabled}>Already Booked</Button>
                                            )
                                            : <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center', width: '100%' }} disabled={disabled}>Book Now</Button>) :
                                        (this.props.onUserPage && this.props.loggedIn ? (<Row style={{ width: '100%', lineHeight: '40px', verticalAlign: 'center' }}>
                                            <Col span={16} style={{ justifyContent: 'space-between', alignItems: 'center', height: '40px', display: 'flex', verticalAlign: 'center', margin: 'auto' }}>
                                                <Tooltip title="Message host">
                                                    <Button shape="circle" size="large" onClick={this.handleMessageClick} icon={<MessageOutlined />} style={{ lineHeight: '30px', margin: "0 5px 0 5px" }} />
                                                </Tooltip>
                                                <Tooltip title="Add to calendar">
                                                    <Button shape="circle" size="large" href={this.generateGcal()} target="_blank" icon={<CalendarOutlined style={{ verticalAlign: '-0.125em' }} />} style={{ lineHeight: '30px', margin: "0 5px 0 5px" }} />
                                                </Tooltip>
                                                <Tooltip title="Share">
                                                    <Button shape="circle" size="large" onClick={this.handleShareClick} target="_blank" icon={<ShareAltOutlined />} style={{ lineHeight: '30px', margin: "0 5px 0 5px" }} />
                                                </Tooltip>

                                            </Col>
                                        </Row>) : <Button type='primary' onClick={this.handleLoggedOutClick} style={{ justifyContent: 'center', width: '100%' }}>Book Now</Button>)}
                                </div>
                            </Card>
                        </div>

                        <div style={currStyle} className="d-gamecard">
                            <Card
                                style={{ flex: 1.3, height: '100%', flexDirection: 'horizontal' }}
                                bodyStyle={{ padding: 'unset', }}
                                className="ant-card-hover"
                            >


                                <Row style={{ display: 'flex', flexDirection: 'horizontal' }}>

                                    <Col span={13} style={{ textAlign: 'left' }}>
                                        <Link to={`/game/${this.props.gd.gameID}`}>
                                            <div className="trigger-card-hover" style={{ display: 'flex', height: '100%' }}>
                                                <div style={{ flexGrow: '1' }}>
                                                    <img
                                                        style={{ objectFit: 'contain', width: '100%', marginBottom: '10px', }}
                                                        src={`${this.props.gd.logo}`}
                                                    ></img>


                                                    <div style={{ padding: '24px' }}>
                                                        <Title level={3}>{this.props.gd.name}</Title>
                                                        <><Paragraph ellipsis={{ rows: 4 }}>{this.props.gd.info}</Paragraph>
                                                            {this.props.onHostPage ? <></> : <><Text type="secondary" style={{ float: "left" }}>Tags </Text>
                                                                <br />
                                                                {this.props.gd.tags.map(tag => <Tag style={{ fontSize: '14px', marginTop: '1vh' }} color="default">{tag}</Tag>)}</>}</>
                                                        <br />
                                                    </div>
                                                </div>

                                                <div >
                                                    <Divider type="vertical" style={{ height: '100%', margin: 'auto' }} />
                                                </div>
                                            </div>

                                        </Link>
                                    </Col>


                                    <Col span={11} style={{ flexGrow: '1' }}>
                                        <div style={leftCardStyle}>
                                            {this.props.onHostPage ?
                                                <>
                                                    <br />
                                                    <Text type="secondary" style={{ width: '100%', textAlign: "left", paddingBottom: '1vh' }}>Tags </Text>
                                                    <div style={{ paddingBottom: '48px' }}>
                                                        {this.props.gd.tags.map(tag => <Tag style={{ fontSize: '14px', marginTop: '1vh', float: 'left' }} color="default">{tag}</Tag>)}

                                                    </div>
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
                                                    <div style={{ display: 'flex', paddingTop: '1vh' }}>

                                                        <div>
                                                            <Text type="secondary" style={{ float: "left" }}>Intro</Text>
                                                            <br />
                                                            {<Paragraph style={{ textAlign: 'left', marginTop: '1vh' }} ellipsis={{ rows: 3 }}><> {this.props.hd.intro}</></Paragraph>}
                                                        </div>
                                                    </div>
                                                    <Divider /></>
                                            }


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
                                                        <Statistic title="Time" value={`${this.props.gd.time}pm`} />
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Divider />

                                            <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto', width: '100%' }}>
                                                {this.props.loggedIn && !this.props.onUserPage ?
                                                    (disabled ?
                                                        (
                                                            <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center', width: '100%' }} disabled={disabled}>Already Booked</Button>
                                                        )
                                                        : <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center', width: '100%' }} disabled={disabled}>Book Now</Button>) :
                                                    (this.props.onUserPage && this.props.loggedIn ? (<Row style={{ width: '100%', lineHeight: '40px', verticalAlign: 'center' }}>
                                                        <Col span={24} style={{ justifyContent: 'center', textAlign: "right", height: '40px', display: 'flex', verticalAlign: 'center' }}>
                                                            <Tooltip title="Message host">
                                                                <Button shape="circle" size="large" onClick={this.handleMessageClick} icon={<MessageOutlined />} style={{ lineHeight: '30px', margin: "0 5px 0 5px" }} />
                                                            </Tooltip>
                                                            <Tooltip title="Add to calendar">
                                                                <Button shape="circle" size="large" href={this.generateGcal()} target="_blank" icon={<CalendarOutlined style={{ verticalAlign: '-0.125em' }} />} style={{ lineHeight: '30px', margin: "0 5px 0 5px" }} />
                                                            </Tooltip>
                                                            <Tooltip title="Share">
                                                                <Button shape="circle" size="large" onClick={this.handleShareClick} target="_blank" icon={<ShareAltOutlined />} style={{ lineHeight: '30px', margin: "0 5px 0 5px" }} />
                                                            </Tooltip>

                                                        </Col>
                                                    </Row>) : <Button type='primary' onClick={this.handleLoggedOutClick} style={{ justifyContent: 'center', width: '100%' }}>Book Now</Button>)}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                        </div > </>}</>

        );
    }
}