import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Steps, Input } from 'antd';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;
const { TextArea } = Input;
const steps = [
    {
        title: 'Review',
        content: 'First-content',
        icon: <SolutionOutlined />,
        leftContent: <><p>Add a note to the host</p> <TextArea placeholder={"Your message here..."} showCount maxLength={100} /></>,
    },
    {
        title: 'Information',
        content: 'Processing your payment...',
        icon: <LoadingOutlined />,
        leftContent: <><p>THe checkout form will go here</p></>,
    },
    {
        title: 'Done',
        content: 'Last-content',
        icon: <SmileOutlined />,
        leftContent: <><p>Confirmation page here</p></>,
    },
];

export default class CheckoutModal extends React.Component {
    constructor(props) {
        super(props);
        this.loginModal = React.createRef();
        this.state = {
            visible: false,
            loading: false,
            modalText: '',
            profileRedirect: false,
            current: 0,
        };
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

    next = () => {
        this.setState({ current: this.state.current + 1 });
    };

    prev = () => {
        this.setState({ current: this.state.current - 1 });
    };

    render() {
        var current = this.state.current
        console.log(document.location.pathname);
        return (
            <Modal
                width={'80vw'}
                title="Checkout"
                visible={this.state.visible}
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={<div className="steps-action">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {/* {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )} */}
                </div>}
            >
                <Steps current={current} type="navigation" size="small">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} icon={item.icon} />
                    ))}
                </Steps>
                <div className="steps-content" style={{ display: 'flex'}}>
                    <div style={{ flex: 1 }}>
                        {steps[current].leftContent}
                    </div>
                    <div style={{ flex: 1 }}>
                        game info here
                    </div>
                </div>
                <p>{this.state.modalText}</p>
            </Modal>
        );
    }
}