import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Layout, Breadcrumb, Icon, Carousel, Row, Col} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class FakeCountdown extends Component {
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
          What is Fake Countdown?
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
            </h1>
          </Col>
        </Row>
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Using a countdown timer to alert users that a discount or deal is about to expire, which only purposely creates urgency for the purchase (e.g., “sale ends in 12h20m33s”)
            </p>
          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1FakeCountdown.png" alt="FakeCountdown." id="FakeCountdown" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
                Here's a video introducing Fake Countdown
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
        <p>Here are some examples of Fake Countdown:</p>
        <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
            <h3><img src="/assets/img/FC1.png" alt="Fake Countdown Example." width= "100%"/>
            <p>The offer end in 1 hour.
            </p>
            <br/>
            (justfab.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FC2.png" alt="Fake Countdown Example." width= "100%"/>
            <p>
              Countdown to end of flash sale.
            </p>
            <br/>
            (mattressfirm.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/FC3.png" alt="Fake Countdown Example." width= "100%"/>
              <p>
                Sale ends soon.
              </p>
            <br/>
            (chicwish.com)</h3>
          </div>
        </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default FakeCountdown;
