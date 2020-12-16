import React from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import CheckoutForm from './CheckoutForm';
import GameCard from './GameCard';

export default class CheckoutModal extends React.Component {
    constructor(props) {
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
        this.setState({message: newMessage});
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
                loading:false
            });
        }, 2000);
        // reload page after a few seconds
        setTimeout(() => {
            window.location.reload();
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
        return (
            <Modal
                width={'80vw'}
                height={'60vh'}
                title="Checkout"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[]}
            >
                <div className="steps-content" style={{ display: 'flex', paddingTop: '3vh'}}>
                    <br></br>
                    <div style={{ flex: 1 }}>
                    <><h3>Billing Information</h3><br></br>
                    <CheckoutForm handleSuccess={this.handleSuccess} handleError={this.props.handleError} gameID={this.props.game ? this.props.game.gameID : null} loading={this.state.loading}></CheckoutForm></>
                    </div>
                    <div style={{ flex: 1 }}>
                        <><h3>Your Order</h3></>
                        <br></br>
                        <GameCard simple={true} gd={this.props.game}></GameCard>
                    </div>
                </div>
                <p>{this.state.modalText}</p>
            </Modal>
        );
    }
}