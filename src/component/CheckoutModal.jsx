import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Input } from 'antd';
import CheckoutForm from './CheckoutForm';
import GameCard from './GameCard';
const { TextArea } = Input;

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

    handleOk = () => {
        this.setState({ modalText: 'Logging you in...', loading: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleError = () => {
        setTimeout(() => {
            this.setState({
                modalText: "Username/Password doesn't match or doesn't exist. Try again.",
                visible: true,
                loading: false
            });
        }, 3000);
    };

    handleSuccess = (username) => {
        console.log('hi')
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
            >
                <div className="steps-content" style={{ display: 'flex', paddingTop: '3vh'}}>
                    <br></br>
                    <div style={{ flex: 1 }}>
                    <><h3>Billing Information</h3><br></br><CheckoutForm></CheckoutForm></>
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