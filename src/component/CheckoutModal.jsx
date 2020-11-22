import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Steps, Input } from 'antd';
import CheckoutForm from './CheckoutForm';
import GameCard from './GameCard';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;
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

        this.steps = [
            // {
            //     title: 'Review',
            //     content: 'First-content',
            //     icon: <SolutionOutlined />,
            //     leftContent: <><p>Add a note to the host</p> <TextArea placeholder={"Your message here..."} value={this.state.message} showCount maxLength={100} style={{width: '80%'}}/></>,
            // },
            {
                title: 'Billing Information',
                content: 'Processing your payment...',
                icon: <LoadingOutlined />,
                leftContent: <><h3>Credit Card Information</h3><br></br><CheckoutForm></CheckoutForm></>,
            },
            // {
            //     title: 'Done',
            //     content: 'Last-content',
            //     icon: <SmileOutlined />,
            //     leftContent: <><p>Confirmation page here</p></>,
            // },
        ];
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
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                // footer={<div className="steps-action">
                //     {current > 0 && (
                //         <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                //             Previous
                //         </Button>
                //     )}
                //     {current < this.steps.length - 1 && (
                //         <Button type="primary" onClick={this.next}>
                //             Next
                //         </Button>
                //     )}
                // </div>}
            >
                {/* <Steps current={current} type="navigation" size="small">
                    {this.steps.map(item => (
                        <Step key={item.title} title={item.title} icon={item.icon} />
                    ))}
                </Steps> */}
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