import React from 'react';
import { Card, Avatar, Button, Divider, Rate, Statistic } from 'antd';
import LoginModal from './loginModal';
const { Meta } = Card;

export default class GameCard extends React.Component {
    constructor(props) {
        super(props);
        this.loginModal = React.createRef();
    }

    handleLoggedOutClick = () => {
        this.loginModal.current.showModal();
    };

    handleLoggedInClick = () => {
        this.props.onBook(this.props.gd);
    }

    render() {

        return (
            <div style={{ display: 'flex', width: '50vw' }}>
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
                        description={this.props.gd.info}
                    />

                </Card>
                <Card
                    style={{ width: 100, flex: 1 }}
                    actions={[
                        this.props.loggedIn ?
                            <Button type='primary' onClick={this.handleLoggedInClick} style={{ justifyContent: 'center' }}>Book Now!</Button> :
                            <Button type='primary' onClick={this.handleLoggedOutClick} style={{ justifyContent: 'center' }}>Book Now!</Button>,
                    ]}
                >
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <br></br>
                            {this.props.hd.name}
                            <br></br>
                            <Rate disabled defaultValue={this.props.hd.rating} style={{ fontSize: 10 }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <br></br>
                            {this.props.hd.intro}
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <Statistic title="PRICE FROM" value={this.props.gd.price} prefix={'USD'} />
                        <Statistic title="LOCATION" value={this.props.gd.location} />
                    </div>
                </Card>
            </div>

        );
    }
}