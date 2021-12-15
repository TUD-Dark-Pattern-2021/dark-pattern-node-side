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
class ForcedContinuity extends Component {
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
          What is Forced Continuity?
            </h1>
          </Col>
        </Row>
        {/* <h2 >
          What is Forced Continuity?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
              This is when the free trial you applied for comes to an end, and without warning, you get charged again for another subscription time length. (e.g. You sign up for a week free trial to premium shopping, then,
              if you have not cancelled your subscription by next week, you will be charged again, without warning)

            </p>
          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1ForcedContinuity.png" alt="ForcedContinuity." id="ForcedContinuity" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
                Introducing Forced Continuity
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
          <iframe src="https://www.youtube.com/embed/AYdMqZbqwJ8" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>Here are some examples of Forced Continuity:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/ForcedContinuity11.png" alt="ForcedContinuity Example." width= "100%"/>
                  <p>Signing up for the "Free Account".</p>

            <br/>
            (TheLadders.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ForcedContinuity2.jpg" alt="ForcedContinuity Example." width= "100%"/>
            <p>Cannot use the features fully due to not having a premium account.
            </p>
            <br/>
            </h3>
          </div>
          <div className={'Slider'}>
            <h3 >
              <img src="/assets/img/ForcedContinuity3.jpg" alt="ForcedContinuity Example." width= "100%"/>
              <p>Forcing you to pay for a premium account.
              </p>
            <br/>
            </h3>
          </div>
            </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default ForcedContinuity;
