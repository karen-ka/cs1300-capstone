import React from 'react'
import { Row, Col, Carousel, Typography } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
const { Title } = Typography;

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
                        <Title level={3} style={{ textAlign: 'left', margin: 'auto' }}>Gallery</Title>
                        <br />
                        <Carousel autoplay dots={false} arrows nextArrow={<RightOutlined className="carousel-arrows" />} prevArrow={<LeftOutlined className="carousel-arrows" />}>


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