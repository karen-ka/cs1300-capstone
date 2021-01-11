import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Button, Input, Avatar, Rate, Typography, message } from 'antd';
import CheckoutForm from './CheckoutForm';
import GameCard from './GameCard';
import { Redirect } from 'react-router-dom';
const { Paragraph } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class ContactModal extends React.Component {
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
            message.success("Message sent successfully!");
            this.setState({
                modalText: "Success! Adding game to your profile.",
                visible: true,
                loading: false
            });
        }, 2000);
        // reload page after a few seconds
        setTimeout(() => {
            // change to redirect to user profile after booking a game
            this.setState({
                profileRedirect: true,
                visible: false
            });

        }, 3000);
    };

    onFinish = (values) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: localStorage.getItem('currentUser'), })
        };
        fetch('/getGames', requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    this.handleSuccess();
                } else {
                    this.handleError();
                };
            });
    };

    render() {

        return (
            <Modal
                style={{ minWidth: '550px' }}
                width={'50vw'}
                height={'60vh'}
                title="Contact Host"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[]}
            >
                <div className="steps-content" style={{ display: 'flex', paddingTop: '3vh' }}>
                    <br></br>
                    <div style={{ flex: 1.5 }}>
                        <>
                            <Form {...layout} style={{ margin: 'auto' }} name="nest-messages" onFinish={this.onFinish}>
                                <Form.Item name="Subject" label="Subject" rules={[{ required: true, message: 'Subject cannot be empty' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="Message" label="Message" rules={[{ required: true, message: 'Message cannot be empty' }]}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    </div>
                    <div style={{ flex: 1, paddingLeft: '5vw', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <><h3 >{this.props.hd.name}</h3></>
                        <Avatar size={100} src={`${process.env.PUBLIC_URL}/${this.props.hd.pfp}`} />
                        <Rate disabled defaultValue={this.props.hd.rating} style={{ fontSize: 12, }} />
                        <Paragraph>{`${this.props.hd.numberOfGames} games hosted`}</Paragraph>
                    </div>
                </div>
            </Modal>
        );
    }
}