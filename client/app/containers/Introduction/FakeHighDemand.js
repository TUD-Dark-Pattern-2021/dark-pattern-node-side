import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Layout, Breadcrumb, Icon, Carousel, Col, Row} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class FakeHighDemand extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }
  static propTypes = {
    login: PropTypes.bool,
  };
  onSubmit(e) {
    e.preventDefault()
    window.alert(e.target.url.value)
  }
  render() {

    return (
      <Content className={'introduction-content'}>
        <Row>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <h1 >
              Fake High-demand
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
            </h1>
          </Col>
        </Row>
        {/*<h2 >
          What is Fake High-demand?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Informing users that the product is in high demand and will sell out soon, thereby making it more attractive to users. (e.g., “this item is in high demand”, “selling fast”)</p>

        </Col>
        <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
        </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
                Here's a video introducing Sneak Into Basket
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
            <iframe src="https://www.youtube.com/embed/kxkrdLI6e6M?start=210&end=227" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
            </iframe>
          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>Here are some examples of Fake High-demand:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
                <h3><img src="/assets/img/FH1.png" alt="Fake High-demand Example." width= "100%"/>
                <p>
                  "Hurry limited quantities left!".
                </p>
            <br/>
            (orthofeet.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FH2.png" alt="Fake High-demand Example." width= "100%"/>
            <p>Out of stock.
            </p>
            <br/>
            (6pm.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/FH3.png" alt="Fake High-demand Example." width= "100%"/>
            <p>Urgent message "items in your cart are high demand".
            </p>
            <br/>
            (fashionnova.com)</h3>
          </div>
        </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default FakeHighDemand;
