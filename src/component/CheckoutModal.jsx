import React from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import CheckoutForm from './CheckoutForm';
import GameCard from './GameCard';
import { Redirect } from 'react-router-dom';

export default class CheckoutModal extends React.Component {
    constructor (props) {
        super(props);
        this.loginModal = React.createRef();
        this.state = {
            message: 'hi',
            visible: false,
            loading: false,
            modalText: '',
            profileRedirect: false,
            current: 0,
        };
    }

    onMessageChange = (newMessage) => {
        this.setState({ message: newMessage });
    }

    showModal = () => {
        this.setState({ visible: true })
    };

    handleSubmit = () => {
        this.setState({ modalText: 'Processing.....', loading: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleError = () => {
        this.handleSubmit();
        setTimeout(() => {
            this.setState({
                modalText: "Error processing payment. Please try again",
                visible: true,
                loading: false
            });
        }, 3000);
    };

    handleSuccess = () => {
        this.handleSubmit();
        setTimeout(() => {
            this.setState({
                modalText: "Success! Adding game to your profile.",
                visible: true,
                loading: false
            });
        }, 2000);
        // reload page after a few seconds
        setTimeout(() => {
            // change to redirect to user profile after booking a game
            window.location.reload();
            this.setState({
                profileRedirect: true
            });
        }, 3000);
    };

    next = e => {
        console.log(e)
        this.setState({ current: this.state.current + 1 });
    };

    prev = () => {
        this.setState({ current: this.state.current - 1 });
    };

    render() {
        console.log(this.props)
        // Redirect to user page after checking out
        if (this.state.profileRedirect) {
            return <Redirect to='/user' />
        };

        return (
            <Modal
                style={{ minWidth: '950px' }}
                width={'80vw'}
                height={'60vh'}
                title="Checkout"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[]}
            >
                <div className="steps-content" style={{ display: 'flex', paddingTop: '3vh' }}>
                    <br></br>
                    <div style={{ flex: 1 }}>
                        <><h3>Billing Information</h3><br></br>
                            <CheckoutForm handleSuccess={this.handleSuccess} handleError={this.props.handleError} gameID={this.props.game ? this.props.game.gameID : null} loading={this.state.loading}></CheckoutForm></>
                    </div>
                    <div style={{ flex: 1 }}>
                        <><h3>Your Order</h3></>
                        <br></br>
                        <GameCard onCheckoutModal={true} simple={true} gd={this.props.game} hd={this.props.hd}></GameCard>
                    </div>
                </div>
                {/* <p>{this.state.modalText}</p> */}
            </Modal>
        );
    }
}