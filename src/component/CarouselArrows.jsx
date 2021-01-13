import React from 'react'
import { Row, Col, Carousel, Typography } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
const { Title } = Typography;
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
}

export default class CarouselArrows extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            imgs: [],
        }
        this.imageStyle = {
            maxWidth: '100%',
            maxHeight: '100%',
        }
    }


    render() {
        return (
            <>
                <Row justify="center" >
                    <Col>
                        <Title level={4} style={{ textAlign: 'left', margin: 'auto' }}>Image Gallery</Title>
                        <br />
                        <Carousel autoplay dots={false} arrows nextArrow={<RightOutlined style={{ color: 'white', fontSize: '50px' }} />} prevArrow={<LeftOutlined style={{ color: 'white', fontSize: '50px' }} />}>


                            {this.props.gallery.map((slide) =>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img style={this.imageStyle} src={slide}></img>
                                </div>

                            )}

                        </Carousel>
                    </Col>
                </Row>
            </>
        );
    }

}

// export default CarouselArrows